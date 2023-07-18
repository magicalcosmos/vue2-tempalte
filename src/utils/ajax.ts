import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'querystring';
import localStorage from '@/utils/localStorage';
import Log from '@/utils/log';
import store from '@/store';
import { IAjaxParams } from '@/interface';
import { CHECKOUTERROR, CHECKOUT_ERROR_DESC, FILEUPLOADSOURCETYPE, LOGIN } from './dict';
import { TCheckoutError } from './dict.d';
import common from '@/utils/common';
class Ajax {

  constructor() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /** 获取配置 */
  getConfig() {
    return new Promise((resolve, reject) => {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const config = store.getters.config;
      if (config.API_BASE && config.WS_ENDPOINT) {
        resolve({
          API_BASE: config.API_BASE,
          WS_ENDPOINT: config.WS_ENDPOINT
        });
      } else {
        const URL = `${protocol}//${host}/config.json`;
        axios
          .get(URL)
          .then((data: any) => {
            let newEnv: any = {};
            const configData = data.data;
            if (configData.enable) {
              newEnv = {
                API_BASE: configData.API_BASE,
                WS_ENDPOINT: configData.WS_ENDPOINT
              };
            } else {
              const env: any = process.env;
              if (env) {
                newEnv = {
                  // for develop
                  API_BASE: typeof env.API_BASE === 'function' ? env.API_BASE(window) : env.API_BASE,
                  WS_ENDPOINT: typeof env.WS_ENDPOINT === 'function' ? env.WS_ENDPOINT(window) : env.WS_ENDPOINT
                };
              }
              if (!newEnv.API_BASE) {
                // in case
                const lastHost = host.split(':')[0];
                newEnv = {
                  API_BASE: `${protocol}//${lastHost}:8006/api/v2`,
                  WS_ENDPOINT: `ws://${lastHost}:8006`
                };
              }
            }
            store.dispatch('setConfig', newEnv);
            resolve(newEnv);
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    });
  }

  /**
   * 请求拦截
   */
  private interceptorsRequest() {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //==========  all config before request  ==============
        return config;
      },
      (err: AxiosError) => {
        //==================  error handle  ====================
        return Promise.reject(err);
      }
    );
  }

  /**
   * 响应拦截
   */
  private interceptorsResponse() {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        const extra: TCheckoutError = response?.data?.extra;
        const data = response?.config?.data;
        const urlQuery = qs.parse(response?.config?.url?.split('?')[1]);
        const isLocalUpload = data instanceof FormData;
        const isGit = urlQuery.branch === 'master' && urlQuery.type === FILEUPLOADSOURCETYPE.GIT.toString();
        const isSVN = urlQuery.branch === 'master' && urlQuery.type === FILEUPLOADSOURCETYPE.SVN.toString();
        if (response.status === 200 && extra && (isLocalUpload || isGit || isSVN)) {
          const message = this.getValueByKey(CHECKOUT_ERROR_DESC, extra);
          if (message) {
            return Promise.reject({ message: common.i18n(message) });
          }
        }
        return response;
      },
      (err: AxiosError) => {
        //==================  error handle  ====================
        // this.errorHandler(err);
        return Promise.reject(err);
      }
    );
  }


  /**
   * 根据key获取对象中的value
   * @param obj 要获取值的目标对象
   * @param key 对象中的key
   * @returns
   */
  getValueByKey<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  /**
   * TODO: optimize in future
   * @param err
   * @returns
   */
  private errorHandler(err: AxiosError) {
    axios.defaults.retry = 1; // retry time
    axios.defaults.retryDelay = config['RETRY_TIME'] || 2000; // retry time configuration
    axios.defaults.shouldRetry = error => true; // retry condition
    var config: any = err.config;
    // is retry
    if (!config || !config.retry) return Promise.reject(err);

    if (!config.shouldRetry || typeof config.shouldRetry !== 'function') {
      return Promise.reject(err);
    }

    // is satisfied retry condition
    if (!config.shouldRetry(err)) {
      return Promise.reject(err);
    }

    // set retry count, default is 0
    config.__retryCount = config.__retryCount || 0;

    // if over retry count
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    // retry count auto increment
    config.__retryCount += 1;

    // delay handle
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    // send request again
    return backoff.then(function() {
      return axios(config);
    });
  }
  /**
   * 通用请求
   * @param type
   * @param ajaxParams
   * @param isQueryString
   * @param isFormData
   */
  protected common(
    type: string,
    ajaxParams: IAjaxParams,
    isQueryString?: boolean,
    isFormData = false,
    responseType = 'json'
  ) {
    return axios
      .all([localStorage.getTokenSync(), this.getConfig()])
      .then(
        axios.spread(function(AUTH_TOKEN, config) {
          if (AUTH_TOKEN) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
          }
          axios.defaults.responseType = responseType;

          axios.defaults.headers[type]['Content-Type'] = !isFormData
            ? 'application/x-www-form-urlencoded'
            : 'multipart/form-data';



          let axiosURL =
            (typeof config.API_BASE === 'function' ? config.API_BASE(window) : config.API_BASE) + ajaxParams.url;
          let axiosParams = ajaxParams.params || {};
          if (isQueryString && Object.keys(ajaxParams.params).length) {
            // put, delete请求参数放至URL后面 URLSearchParams解决qs过滤空数组问题
            axiosURL += (axiosURL.indexOf('?') < 0 ? '?' : '&') + qs.stringify(Object.assign(ajaxParams.params));
            axiosParams = {};
          }
          const result = axios[type](axiosURL, axiosParams);
          result.catch((error: any) => {
            if (
              error &&
              error.response &&
              error.response.status === 401 &&
              ajaxParams.url.indexOf('access-token.json') < 0
            ) {
              common.signOut();
            }
            return error;
          });
          return !ajaxParams.callback
            ? result
            : result
              .then(data => {
                ajaxParams.callback('', data);
              })
              .catch(error => {
                ajaxParams.callback(error);
              });
        })
      )
      .catch((err: Error) => {
        return ajaxParams.callback
          ? ajaxParams.callback(err)
          : new Promise((resolve, reject) => {
            reject(err);
          });
      });
  }

  get(ajaxParams: IAjaxParams, isQueryString: boolean = true, responseType: string = 'json') {
    return this.common('get', ajaxParams, isQueryString, false, responseType);
  }

  post(ajaxParams: IAjaxParams, isQueryString: boolean = false, responseType: string = 'json') {
    return this.common('post', ajaxParams, isQueryString, false, responseType);
  }

  put(ajaxParams: IAjaxParams, isQueryString: boolean = true, responseType: string = 'json') {
    return this.common('put', ajaxParams, isQueryString, false, responseType);
  }

  delete(ajaxParams: IAjaxParams, isQueryString: boolean = true, responseType: string = 'json') {
    return this.common('delete', ajaxParams, isQueryString, false, responseType);
  }

  /**
   * 用于提交文件
   * @param ajaxParams
   * @param isQueryString
   */
  formData(ajaxParams: IAjaxParams, isQueryString: boolean = true, responseType: string = 'arraybuffer') {
    return this.common('post', ajaxParams, isQueryString, true, responseType);
  }

  download(ajaxParams: IAjaxParams, isQueryString: boolean = true, responseType: string = 'arraybuffer') {
    return this.common('get', ajaxParams, isQueryString, false, responseType);
  }

  postDownload(ajaxParams: IAjaxParams, isQueryString: boolean = false, responseType: string = 'arraybuffer') {
    return this.common('post', ajaxParams, isQueryString, false, responseType);
  }
}

const ajax = new Ajax();
export default ajax;

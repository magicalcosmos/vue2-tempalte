import qs from 'querystring';
import router from '@/router';
import i18n from '@/i18n';
import store from '@/store';
import {
  COVERAGES,
  ROLES,
  FILESTATUS,
  LOGIN,
  LICENSESTATUS,
  TESTCASEKIND,
  VERSIONTYPE,
  TESTCASEGROUPTYPE
} from '@/utils/dict';
import utils from '@/utils/utils';
import { UserInformation, LicenseManagement } from '@/api';
import { throttle, debounce } from 'throttle-debounce';
import LocalStorage from '@/utils/localStorage';
import { IThrottleOptions } from '@/interface';
export class Common {
  renderProcess(h, { column, $index }) {
    return h('span', [
      h(
        'el-tooltip',
        {
          attrs: {
            placement: 'top',
            effect: 'light',
            // content: '测试进度指的是项目目中所有函数所有覆盖准则的平均覆盖率'
            content: i18n.t('utils.process_content')
          }
        },
        [
          h('img', {
            attrs: {
              src: require('@img/question.png')
            },
            style: 'margin-left: 5px; height: 16px; width: 16px;'
          })
        ]
      ),
      h('span', column.label)
    ]);
  }
  /**
   * 获取个人信息
   */
  getUserInformation() {
    return new Promise((resolve, reject) => {
      UserInformation.get((error, data) => {
        store.dispatch('setUserInfo', error ? {} : data.data);
        if (error) {
          reject(error);
        } else {
          const res = data.data;
          if (res && Object.keys(res).length) {
            // 防止快速重复刷新页面导致接口无返回数据造成回到首页问题
            let role = 'Admin';
            if ((data.data.role & ROLES.TESTER) > 0) {
              role = 'Tester';
            }
            if ((data.data.role & ROLES.TESTERMANAGER) > 0) {
              role = 'TesterManager';
            }
            this._getLicenseStatus(role)
              .then((status: any) => {
                store.dispatch('initRoutes', status).then(() => {
                  // 重新加载路由
                  router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                  error ? reject(error) : resolve(status);
                });
              })
              .catch((licenseError: any) => {
                store.dispatch('initRoutes', { licenseStatus: LICENSESTATUS.INVALID }).then(routes => {
                  // 重新加载路由
                  router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                  // 若返回404，自定义error
                  if (licenseError.response.status === 404) {
                    reject({
                      ...licenseError,
                      message: 'LICENSE NOT FOUND'
                    });
                  } else {
                    reject(licenseError);
                  }
                });
              });
          }
        }
      });
    });
  }
  _initRoutes() {}

  /**
   * get license status
   * @param role
   */
  _getLicenseStatus(role: string) {
    return new Promise((resolve, reject) => {
      LicenseManagement[`get${role}License`]((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  }
  /**
   * 用于ts翻译
   * @param translateKey
   */
  i18n(translateKey: string, options?: any) {
    return window['vm'].$i18n.t(translateKey, options);
  }
  /**
   * 根据role获取角色列表
   * @param role
   */
  getRoleList(role: any) {
    const roleList = [];
    for (const key in ROLES) {
      if ((role & ROLES[key]) > 0) {
        roleList.push(ROLES[key]);
      }
    }
    return roleList;
  }
  /**
   * 深复制(exclude function, null, regex)
   * @param target object
   */
  deepClone(target: any) {
    return JSON.parse(JSON.stringify(target));
  }
  /**
   * 深复制
   * @param target object
   */
  deepCloneAll(target: any) {
    const newTarget: any = target.constructor === Array ? [] : {};
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        if (newTarget[key] && typeof newTarget[key] === 'object') {
          newTarget[key] = target[key].constructor === Array ? [] : {};
          newTarget[key] = this.deepCloneAll(target[key]);
        } else {
          newTarget[key] = target[key];
        }
      }
    }
    return newTarget;
  }
  /**
   * 将覆盖率转换数组
   * @param coverage
   */
  coveragesNumberToArray(coverage): Array<number> {
    const coveragesArray: Array<number> = [];
    const originCoverages = Object.values(COVERAGES);
    originCoverages.forEach(cor => {
      if ((cor & coverage) > 0) {
        coveragesArray.push(cor);
      }
    });
    return coveragesArray;
  }
  /**
   * 将coveragesArray转换成数值
   * @param coveragesArray
   */
  coveragesArrayToNumber(coveragesArray: Array<number>): number {
    return coveragesArray.reduce((prev, curr) => {
      return prev + curr;
    });
  }
  /**
   * 字符串分隔
   * @param sign 分隔符
   */
  stringSplit(str: string, sign = ','): Array<any> {
    if (!str) {
      return [];
    }
    return Array.prototype.slice.apply(str.split(sign).filter(item => item !== ''));
  }
  /**
   * 字符串分隔成key value对象数组
   * @param str 分隔字符串
   * @param sign 分隔符，默认为";"
   * @param subSign 子分隔符，默认为"="
   * @return [{ key: xxx, value: xxx}, ...]
   */
  stringSplitToKVArray(str: string, sign = ';', subSign = '='): Array<any> {
    if (!str) {
      return [];
    }
    const strArray = this.stringSplit(str, sign);
    const newArray = [];
    strArray.forEach(element => {
      const elementArray = this.stringSplit(element, subSign);
      newArray.push({
        key: elementArray[0],
        value: elementArray[1] !== undefined ? elementArray[1] : ''
      });
    });
    return newArray;
  }
  /**
   * 字符串分隔成对像数组
   * @param str 分隔字符串
   * @param sign 分隔符，默认为","
   * @param subSign 子分隔符，默认为"="
   * @param value 可手动设置值(可选)
   * @return [{ xxx: xxx}, ...]
   */
  stringSplitToObjectArray(str: string, sign = ',', subSign = '=', value?: any): Array<any> {
    if (!str) {
      return [];
    }
    const strArray = this.stringSplit(str, sign);
    const newArray = [];
    strArray.forEach(element => {
      const elementArray = this.stringSplit(element, subSign);
      const obj = {};
      obj[elementArray[0]] = value || elementArray[1];
      newArray.push(obj);
    });
    return newArray;
  }
  /**
   * 合并参数，只对单个字符串和object
   * @param url 地址
   * @param obj 拼接对象, 如{a: 1} 或 '1'
   * @param field 单个拼接的key(可选), 如： a = 1中的a
   */
  concatURLParams(params: any, value: any, field?: string) {
    const prefix = params.url + (params.url.indexOf('?') === -1 ? '?' : '&');
    if (value !== '' && value !== undefined) {
      switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
          params.url = prefix + `${field}=${value}`;
          break;
        default:
          params.url = prefix + qs.stringify(value);
      }
    }
  }
  /**
   * 将数组元素拼接到URL后面
   * @param params
   * @param array
   * @param field
   */
  arrayToURLParams(params: any, array: Array<any>, field: string) {
    array &&
      array.forEach((el: any) => {
        this.concatURLParams(params, el, field);
      });
  }
  /**
   * 处理文件消息
   * @param {File} file 文件信息
   * @param {Array} extensions 后缀名列表
   * @returns {Object}
   */
  handleFileMessage(file: any, extensions?: any) {
    const extSet = new Set();
    if (extensions) {
      if (!utils.isArrayType(extensions)) {
        extensions = [extensions];
      } else if (!extensions[0]) {
        extensions = null;
      }
      extensions &&
        extensions.forEach(ext => {
          if (!ext) {
            ext = '_';
          }
          extSet.add(ext.replaceAll('.', '_'));
        });
    }
    const count = {
      failedCount: 0,
      succeedCount: 0,
      invokeCovered: 0,
      invokeTotal: 0,
      invokedFuncCovered: 0,
      invokedFuncTotal: 0,
      statementCovered: 0,
      statementTotal: 0,
      branchCovered: 0,
      branchTotal: 0,
      mcdcCovered: 0,
      mcdcTotal: 0,
      fileCount: 0,
      compiledCount: 0,
      compileFailedCount: 0,
      unreadCount: 0,
      waiting4compilingCount: 0
    };
    Object.keys(count).forEach(key => {
      if (!file[key]) {
        delete count[key];
        return;
      }
      Object.keys(file[key]).forEach(ext => {
        if (!extensions || extSet.has(ext)) {
          count[key] += file[key][ext];
        }
      });
    });

    if (count.invokeTotal) {
      file.invokeCoverage = count.invokeCovered / count.invokeTotal;
    } else if (count.invokeTotal === 0) {
      file.invokeCoverage = undefined;
    }

    if (count.invokedFuncTotal) {
      file.invokedFuncCoverage = count.invokedFuncCovered / count.invokedFuncTotal;
    } else if (count.invokedFuncTotal === 0) {
      file.invokedFuncCoverage = undefined;
    }

    if (count.statementTotal) {
      file.statementCoverage = count.statementCovered / count.statementTotal;
    } else if (count.statementTotal === 0) {
      file.statementCoverage = undefined;
    }

    if (count.branchTotal) {
      file.branchCoverage = count.branchCovered / count.branchTotal;
    } else if (count.branchTotal === 0) {
      file.branchCoverage = undefined;
    }

    if (count.mcdcTotal) {
      file.mcdcCoverage = count.mcdcCovered / count.mcdcTotal;
    } else if (count.mcdcTotal === 0) {
      file.mcdcCoverage = undefined;
    }

    if (count.fileCount) {
      if (count.compileFailedCount) {
        file.status = FILESTATUS.COMPILATION_FAILED;
      } else if (count.waiting4compilingCount) {
        file.status = FILESTATUS.WAITING_COMPILAION;
      } else if (count.compiledCount === count.fileCount) {
        file.status = FILESTATUS.COMPILATION_SUCCEED;
      } else if (count.compiledCount !== undefined) {
        file.status = FILESTATUS.UNCOMPILED;
      }
    }
    if (count.fileCount === 0) {
      file.status = FILESTATUS.UNCOMPILED;
    }
    if (count.failedCount > 0 || count.succeedCount > 0) {
      file.failed = count.failedCount > 0;
    }
    if (count.unreadCount > 0) {
      file.unread = true;
    } else if (count.unreadCount === 0) {
      file.unread = false;
    }
    return file;
  }
  // 实现函数节流
  throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
      method.call(context);
    }, 500);
  }
  /**
   * 函数节流
   * @date 2021-11-24
   * @param {Function} callback
   * @param {any} number delay 延迟时间，默认300ms
   * @param {IThrottleOptions} options 函数节流配置参数,可选
   * @return {any}
   */
  throttles(callback: Function, delay = 300, options?: IThrottleOptions) {
    let _this, args, timeout;
    let old = 0; //时间戳
    //如果没有options就将其设置为空对象
    if (!options) options = {};

    const later = function() {
      old = new Date().valueOf();
      timeout = null;
      callback.apply(_this, args);
    };
    return function() {
      _this = this;
      args = arguments;
      const now = new Date().valueOf();
      if (options.leading === false && !old) {
        old = now;
      }
      if (now - old > delay) {
        // 第一次直接执行
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        callback.apply(_this, args);
        old = now;
      } else if (!timeout && options.trailing !== false) {
        //最后一次也被执行
        timeout = setTimeout(later, delay);
      }
    };
  }

  /**
   * 函数防抖
   * @date 2021-11-24
   * @param Function callback 回调函数
   * @param number delay 延迟时间，默认300ms
   * @param boolean immediate 是否立即执行，默认为false
   * @return Function
   */
  debounce(callback: Function, delay: number = 300, immediate?: boolean) {
    let timer, result;
    const debounced = function() {
      const context = this;
      const args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      if (immediate) {
        const callNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, delay);
        if (callNow) result = callback.apply(context, args);
      } else {
        timer = setTimeout(() => {
          result = callback.apply(context, args);
        }, delay);
      }
      return result;
    };
    debounced.cancel = function() {
      clearTimeout(timer);
      timer = null;
    };
    return debounced;
  }
  // 获取OS操作系统
  getOS() {
    if (navigator.userAgent.indexOf('Window') > 0) {
      return 'Windows';
    } else if (navigator.userAgent.indexOf('Mac OS X') > 0) {
      return 'Mac ';
    } else if (navigator.userAgent.indexOf('Linux') > 0) {
      return 'Linux';
    } else {
      return 'NUll';
    }
  }
  /**
   * 文件流下载
   * @param res
   * @param type 下载文件后缀
   * @param fileName 下载文件名
   */
  downloadFileStream(res: any, type?: string, fileName?: string) {
    const blob = new Blob([res.data]); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
    const contentDisposition = res.headers['content-disposition']; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
    const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
    const result = patt.exec(contentDisposition);
    if (!fileName) {
      fileName = result && result.length > 1 ? result[1] : 'test_report_' + +new Date();
    }
    let filename = fileName;
    if (type) {
      filename += `.${type}`;
    }
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    const reg = /^["](.*)["]$/g;
    downloadElement.style.display = 'none';
    downloadElement.href = href;
    downloadElement.download = decodeURI(filename.replace(reg, '$1')); //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
  /**
   * 判断对象是否为空
   * @param data
   */
  isObjectEmpty(data: any) {
    return !data || Object.keys(data).length === 0;
  }
  /**
   * 是否是数字
   * @param value
   */
  isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  /**
   * 移出文件树状态节点
   * @param that
   */
  removeFileTreeExpandSet(that: any) {
    LocalStorage.remove('fileTreeExpandSet');
    that.$set(this, 'expandKeys', []);
  }
  /**
   * 是否是空值
   * @param data
   */
  isEmptyElement(data) {
    return data === null || data === undefined || data === '';
  }
  bindGlobalEvents(eventName: string, func: EventListener, isRemove = false) {
    window[`${!isRemove ? 'add' : 'remove'}EventListener`](eventName, func, false);
  }
  uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  /**
   * 退出登录
   */
  signOut() {
    window.location.href = window.location.href.replace('access_token', 'exit_token');
    LocalStorage.remove(LOGIN.TOKEN);
    window.location.reload(); // 为了重新实例化vue-router对象 避免bug
  }
  jsonToString(rowData: any) {
    var cache = [];
    var json = JSON.stringify(
      rowData,
      function(key, value) {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            return;
          }
          cache.push(value);
        }
        return value;
      },
      2
    );
    cache = null;
    return json;
  }
  /**
   * format date
   * @param timestamp
   * @param formatStr
   */
  formatTimestamp(timestamp, formatStr) {
    if (!timestamp) {
      return '-';
    }
    const time = new Date(timestamp);
    function convert2bit(day) {
      if (day < 10) {
        return `0${day}`;
      }
      return day;
    }
    const fmd = [time.getUTCFullYear(), convert2bit(time.getUTCMonth() + 1), convert2bit(time.getUTCDate())];
    const hms = [convert2bit(time.getHours()), convert2bit(time.getUTCMinutes()), convert2bit(time.getUTCSeconds())];
    switch (formatStr.toLowerCase()) {
      case 'yyyy-mm-dd hh:mm:ss':
        return fmd.join('-') + ' ' + hms.join(':');
      default:
    }
  }
  goBack(num?: number) {
    history.go(num || -1);
  }
  /**
   * get modules from license
   */
  getModules() {
    const license = store.getters.licenseStatus.license;
    const modules = license && license.modules;
    return modules || {};
  }
  /**
   * generate uuid
   */
  genUUID() {
    var s = [];
    var hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  }
  /**
   * generated id
   * @param length
   */
  genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }
  /**
   * filter tesecase which is enable to report code defect
   * @param testcase
   */
  filterTestcaseReportDefectAble(testcase) {
    if (
      !testcase ||
      Object.keys(testcase).length === 0 ||
      testcase.result === undefined ||
      testcase.kind === undefined
    ) {
      return false;
    }
    return (
      (testcase.result.kind !== 0 &&
        testcase.result.kind !== 1 &&
        testcase.result.kind !== 3 &&
        testcase.result.kind !== 4) ||
      ((TESTCASEKIND.AUTO_DEFECT & testcase.kind) > 0 && testcase.kind !== 0)
    );
  }

  /**
   * Parse a time into a formatted date using the specified format pattern.
   * @param {String/Date} time The time to format.
   * @param {String} cFormat Any valid date format string. Defaults to: '{y}-{m}-{d} {h}:{m}:{s}'
   * @returns The formated date string
   */
  parseTime(time, cFormat?: string) {
    if (!time) {
      return '-';
    }
    if (arguments.length === 0) {
      return null;
    }

    if ((time + '').length === 10) {
      time = +time * 1000;
    }

    const format = cFormat || '{y}-{M}-{d} {h}:{m}:{s}';
    let date;
    if (typeof time === 'object') {
      date = time;
    } else {
      date = new Date(parseInt(time));
    }

    const formatObj = {
      y: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/{(y|M|d|h|m|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  }
  private pluralize(time, label) {
    if (time === 1) {
      return time + label;
    }
    return time + label + 's';
  }
  /**
   *
   * @param time
   * @returns
   */
  timeAgo(time) {
    const between = Date.now() / 1000 - Number(time);
    if (between < 3600) {
      return this.pluralize(~~(between / 60), ' minute');
    } else if (between < 86400) {
      return this.pluralize(~~(between / 3600), ' hour');
    } else {
      return this.pluralize(~~(between / 86400), ' day');
    }
  }

  private _countTime(second, base, leftBase, unit, subUnit) {
    const left = Math.ceil(second % base);
    const time = ~~(second / base);
    const case1 = time + unit;
    const case2 = (leftBase ? ~~(left / leftBase) : left) + subUnit;
    if (!left) {
      return case1;
    } else if (!time) {
      return case2;
    } else {
      return case1 + case2;
    }
  }

  /**
   * 统计时间
   * @param time The time to count.
   * @returns
   */
  countTime(time) {
    if (!time) {
      return '0ms';
    }
    if (time < 1000) {
      return time + 'ms';
    }
    const second = Number(time) / 1000;
    if (second < 3600) {
      return this._countTime(second, 60, null, 'm', 's');
    } else if (second < 86400) {
      return this._countTime(second, 3600, 60, 'h', 'm');
    } else {
      return this._countTime(second, 86400, 3600, 'd', 'h');
    }
  }

  /**
   * Number formatting
   * like 10000 => 10k
   * @param {number} num
   * @param {number} digits
   * @returns
   */
  numberFormatter(num, digits) {
    const si = [
      { value: 1e18, symbol: 'E' },
      { value: 1e15, symbol: 'P' },
      { value: 1e12, symbol: 'T' },
      { value: 1e9, symbol: 'G' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'k' }
    ];
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
      }
    }
    return num.toString();
  }

  /**
   * Html to text
   * @param val
   * @returns
   */
  html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
  }
  /**
   * 对1000以上的数值使用逗号分隔
   * 1000 => "1,000"
   * 10000 => "10,000"
   * 100000 => "100,000"
   * @param {number} num
   * @returns
   */
  toThousandslsFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
  }

  /**
   * 进度保留两位小数且不四舍五入，解决0.999999转换成100%问题
   * @param {Number} progress 数字
   */
  filterProgressToPercent(progress: number) {
    return Math.floor((progress || 0) * 10000) / 100;
  }

  private calculateDigital(digital: number, count: number) {
    digital = digital || 0;
    count = count || 2;
    return parseFloat(parseFloat(digital * 100 + '').toFixed(2));
  }
  /**
   * 数字固定位数
   * @param {Number} digital 数字
   * @param {Number} count 保留位数, 如果有count强制保留两位数，返回的是字符串，否则是number类型
   */
  numberToFixed(digital, count) {
    return this.calculateDigital(digital, count);
  }
  /**
   * 数字固定位数带有单位
   * @param {Number} digital 数字
   * @param {Number} count 保留位数, 如果有count强制保留两位数，返回的是字符串，否则是number类型
   * @param {String} unit 单位 可自定义
   */
  numberToFixedWithSign(digital, count, unit?: string) {
    return this.calculateDigital(digital, count) + (unit || '%');
  }
  /**
   * 获取当前测试类型
   * @update 2021-10-8 16:32:05
   */
  currentTestType() {
    let moduleType = '';
    if (this.isUnitTest()) {
      moduleType = VERSIONTYPE.UNIT_TEST;
    } else if (this.isStaticAnalysis()) {
      moduleType = VERSIONTYPE.STATIC_ANALYSIS;
    } else if (this.isIntegrationTest()) {
      moduleType = VERSIONTYPE.INTEGRATION_TEST;
    }
    return moduleType;
  }

  /**
   * 判断是否为集成测试类型 测试主页可用
   * @return boolean
   */
  isIntegrationTest() {
    return (router.currentRoute.name || '').indexOf('IntegrationHome') !== -1;
  }
  /**
   * 判断是否为单元测试类型 测试主页可用
   * @return boolean
   */
  isUnitTest() {
    return (router.currentRoute.name || '').indexOf('ProjectMain') !== -1;
  }
  /**
   * 判断是否为静态分析类型 静态分析主页可用
   * @return boolean
   */
  isStaticAnalysis() {
    return (router.currentRoute.name || '').indexOf('AnalysisHome') !== -1;
  }
  /**
   * 验证许可证权限，判断是否同时具有单元测试和集成测试功能
   * @date 2021-08-31
   * @returns {boolean}
   */
  validateLicensePrivilege() {
    const modules = this.getModules();
    const unitTest = modules['unitTest'];
    const integrationTest = modules['integrationTest'];
    let result = false;
    if (unitTest && integrationTest) {
      if (unitTest.status === LICENSESTATUS.NORMAL && integrationTest.status === LICENSESTATUS.NORMAL) {
        result = true;
      }
    }
    return result;
  }
  // 集成测试全局变量，绝对地址，指针目标，桩函数的name带有@fileId, 显示@fileId前的内容
  transformTestcaseDisplayName(item) {
    const { name, fileId } = item;
    if (!name) return '';
    if (fileId && name.indexOf(fileId) !== -1) {
      return name.replace(`@${fileId}`, '');
    } else {
      return name.replace(/@([0-9a-fA_F]{24})$/, '');
    }
  }

  /**
   * 从对象中取值，当key为a.b.c格式时
   * @date 2021-09-17
   * @param {any} obj 要取值的对象
   * @param {string} path 取值路径，格式如a.b.c
   * @return {any}
   */
  parsePath(obj: any, path: string): any {
    if (!obj) return;
    if (!path) return;
    const segments = path.split('.');
    for (let i = 0; i < segments.length; i++) {
      obj = obj?.[segments[i]];
    }
    return obj;
  }

  /**
   * 计算单词的宽度
   * @date 2021-12-08
   * @param string word
   * @return {any}
   */
  getTextWidth() {
    let ele = null;
    const fn = function(text: string) {
      ele = ele || document.createElement('span');
      ele.style.display = 'inline-block';
      ele.textContent = text;
      document.body.appendChild(ele);
      const width = ele.clientWidth;
      document.body.removeChild(ele);
      return width;
    };
    fn.clear = function() {
      ele = null;
    };
    return fn;
  }

  /**
   * 搜索关键字特殊字符处理
   * @param keyword
   * @return
   */
  filterKeywordWhenSearch(keyword: string) {
    return keyword
      .replaceAll('[', '\\[')
      .replaceAll(']', '\\]')
      .replaceAll('(', '\\(')
      .replaceAll(')', '\\)')
      .replaceAll('+', '\\+')
      .replaceAll('*', '\\*');
  }
  /**
   * 用例显示名称
   * @param item
   * @return
   */
  formatTestcaseName(item) {
    return `${item.type === TESTCASEGROUPTYPE.GROUP ? this.i18n('testcase.group') : this.i18n('overview.case')}${
      item.number
    }`;
  }

  /**
   * 获取文件名
   * @param path 文件路径
   * @returns
   */
  getFileName(path: string) {
    if (path && path.lastIndexOf('/') !== -1) {
      return path.substring(path.lastIndexOf('/') + 1);
    }
    return path;
  }
  /**
   * 进度条取整
   * @param progress 进度
   * @returns
   */
  formatProgress(progress: number) {
    return Math.floor(progress * 100);
  }

  /**
   * 截断字符串，如果超过指定长度，则在末尾添加省略号 （'...'）
   * @param value 要截断的字符串
   * @param len 截断前允许的最大长度
   * @param word
   * @returns
   */
  ellipsis(value, len, word = false) {
    if (value && value.length > len) {
      if (word) {
        const vs = value.substr(0, len - 2),
          index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
        if (index !== -1 && index >= len - 15) {
          return vs.substr(0, index) + '...';
        }
      }
      return value.substr(0, len - 3) + '...';
    }
    return value;
  }
}

const common = new Common();

export default common;

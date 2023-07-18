import localStorage from '@/utils/localStorage';
import Log from '@/utils/log';
import ajax from '@/utils/ajax';
import store from '@/store';
import { CMD } from './dict';

export class RWebSocket {
  // save all subscribed channel for subscribing channel after ws closed again
  private channelStore: Object = {};
  // is connect again
  private isReconnect: boolean = true;
  /**
   * connect to channel
   * @param params
   */
  connect(params?: any): any {
    Promise.all([localStorage.getTokenSync(), ajax.getConfig()]).then(result => {
      const token: string = result[0];
      const config: any = result[1];
      if (token && config) {
        const WSURL = typeof config.WS_ENDPOINT === 'function' ? config.WS_ENDPOINT(window) : config.WS_ENDPOINT;
        const ws = new WebSocket(`${(params && params.url) || WSURL}?accessToken=${token}`);
        this.initWebSocketMethods(ws, params);
      }
    });
  }
  /**
   * initialize websoket method
   * @param ws
   * @param params
   */
  initWebSocketMethods(ws: WebSocket, params: any) {
    ws.onopen =
      (params && params.onopen) ||
      (() => {
        Log.log('Websocket connection open...'); // eslint-disable-line
        // subscribe channel again
        for (const channel in this.channelStore) {
          channel && this.subscribe(channel);
        }
      });
    ws.onmessage =
      (params && params.onmessage) ||
      ((result: any) => {
        const data = JSON.parse(result.data);
        // print message info
        Log.log(JSON.stringify(data, null, 2));
        store.dispatch('setWebSocketMessage', data);
        params.callback && params.callback(data);
      });
    ws.onclose = (data: any) => {
      Log.log('Websocket connection closed'); // eslint-disable-line
      store.dispatch('setWebSocketMessage', data);
      if (data.code !== CMD.CLOSE) {
        this.isReconnect && this.connect(params);
      }
    };
    store.dispatch('setWebSocket', ws);
  }
  stop() {
    // 停止
    this.isReconnect = false;
    store.dispatch('setWebSocket', null);
  }
  start() {
    // 开始
    this.isReconnect = true;
    this.channelStore = {};
    this.connect();
  }
  /**
   * common send for subscribe and unsubscribe
   * @param cmd
   * @param channel
   */
  commonSend(cmd: string, channel: string) {
    const ws: any = store.getters.rWebSocket.ws;
    ws && ws.send(JSON.stringify({ cmd: cmd, data: { channel: channel, accessToken: localStorage.getToken() }}));
  }
  /**
   * subscribe channel
   * @param channel
   */
  subscribe(channel: string) {
    // 订阅频道
    this.channelStore[channel] = channel;
    this.commonSend('subscribe', channel);
  }
  /**
   * cancel subscribe channel
   * @param channel
   */
  unsubscribe(channel: string) {
    // 取消订阅频道
    this.channelStore[channel] && delete this.channelStore[channel];
    this.commonSend('unsubscribe', channel);
  }
}
const rWebSocket: any = new RWebSocket();
export default rWebSocket;

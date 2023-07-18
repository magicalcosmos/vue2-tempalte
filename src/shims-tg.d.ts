import { Log } from '@/utils/log';
import { Variable } from '@/utils/variable';
import { Util } from './utils/utils';
import { Common } from '@/utils/common';
import { RWebSocket } from '@/utils/websocket';
import { IMessage } from '@/types/message.types';
import * as Paths from '@/router/paths';

/* eslint @typescript-eslint/no-unused-vars: 0 */
declare var window: Window;
declare var document: Document;
declare var require: any;
declare module 'vue/types/vue' {
  interface Vue {
    $log: InstanceType<typeof Log>
    $paths: typeof Paths
    $ws: InstanceType<typeof RWebSocket>
    $var: InstanceType<typeof Variable>
    common: InstanceType<typeof Common>
    utils: InstanceType<typeof Util>
  }
}

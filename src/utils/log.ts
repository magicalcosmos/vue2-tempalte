/*eslint-disable*/
import LocalStorage from './localStorage';
/**
 * log dictionary
 */
const LOGDICT = {
  log: 1,
  info: 1,
  warn: 2,
  trace: 3,
  error: 4,
  table: 5
};

export class Log {
  /**
   * get loglevel from localStorage
   * @returns {number}
   */
  getLogLevel(): number {
    const logLevel =
      LocalStorage.get('LOGLEVEL') ||
      LocalStorage.get('loglevel') ||
      LocalStorage.get('logLevel' || LocalStorage.get('LogLevel'));
    return logLevel ? Number(logLevel) : undefined;
  }
  /**
   * Is go on output the program log
   * @param num
   * @returns {boolean}
   */
  isGoOn(num: number): boolean {
    const logLevel = this.getLogLevel();
    return logLevel && num >= logLevel;
  }
  /**
   * complete time for year month day hour minute second
   * @param data
   */
  completeTime(data: number): string {
    return data > 9 ? data + '' : '0' + data;
  }
  /**
   * output information
   */
  getLogTime(): string {
    const date = new Date();
    return `${date.getFullYear()}-${this.completeTime(date.getMonth() + 1)}-${this.completeTime(
      date.getDate()
    )} ${this.completeTime(date.getHours())}:${this.completeTime(date.getMinutes())}:${this.completeTime(
      date.getSeconds()
    )}`;
  }
  /**
   * output information
   * @param data
   */
  log(...data: any) {
    if (this.isGoOn(LOGDICT.log)) {
      console.log('%c%s', 'color:#121212;font-size: 18px;', this.getLogTime());
      console.log('%c%s', 'color:#78C06E;', ...data);
    }
  }
  /**
   * output information(log alias)
   * @param data
   */
  info(...data: any) {
    if (this.isGoOn(LOGDICT.info)) {
      this.log(this.getLogTime());
      console.info('%c%s', 'color:orange;', ...data);
    }
  }
  /**
   * output warn information
   * @param warning
   */
  warn(...warning: any) {
    if (this.isGoOn(LOGDICT.warn)) {
      this.log(this.getLogTime());
      console.warn('%c%s', 'color:yellow;', ...warning);
    }
  }
  /**
   * trace functon invoke process
   */
  trace() {
    if (this.isGoOn(LOGDICT.trace)) {
      this.log(this.getLogTime());
      console.trace(); // eslint-disable-line
    }
  }
  /**
   * output error
   * @param error
   */
  error(...error: any) {
    if (this.isGoOn(LOGDICT.error)) {
      this.log(this.getLogTime());
      console.error('%c%s', 'color:#F56C6C;', ...error);
      this.trace(); // eslint-disable-line
    }
  }
  /**
   * convert composite data to table
   * @param data
   */
  table(data: Array<any>) {
    if (this.isGoOn(LOGDICT.table)) {
      console.table(data);
    }
  }
}

const log = new Log();
export default log;

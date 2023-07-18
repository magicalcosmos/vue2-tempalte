interface IIntegrationFunctionStubParams {
  /**
   * true: 打桩，false: 取消打桩
   */
  stubStatus?: boolean;
  /**
   * 定义函数
   */
  functionId?: string;
  /**
   * 未定义函数
   */
  mangledId?: string;
  /**
   * 未定义函数name
   */
  functionName?: string;
}

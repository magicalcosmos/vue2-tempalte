interface IDynamicComponentAttributes<T = any, U = any> {
  /**
   * 组件名字
   */
  componentName: string;
  /**
   * 组件的数据
   */
  data?: T;
  /**
   * 自定义动态数据传递
   */
  dynamicCustomData?: U;
  /**
   * 保存事件
   */
  save?: () => {};
  /**
   * 取消事件
   */
  cancel?: () => {};
}

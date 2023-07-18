const getters = {
  recentProjects: (state: any) => state.recentProjects,
  user: (state: any) => state.user,
  addRouters: (state: any) => state.routes.addRouters,
  licenseStatus: (state: any) => state.routes.licenseStatus,
  componentNames: (state: any) => state.catchComponents.componentNames,
  activeComponentName: (state: any) => state.catchComponents.activeComponentName,
  config: (state: any) => state.config,
  rWebSocket: (state: any) => state.webSocketMessage,
  loading: (state: any) => state.loading,
  fileTreeNodeSelected: (state: any) => state.fileTreeNodeSelected,
  testcase: (state: any) => state.testcase,
  func: (state: any) => state.func,
  tree: (state: any) => state.tree,
  cascader: (state: any) => state.cascader,
  closeTips: (state) => state.license.closeTips,
  defect: (state) => state.defect,
  dynamicComponent: (state) => state.dynamicComponentParams
};
export default getters;

declare type TDiffVersion = {
  /**
   * 新加的文件列表
   */
  addFiles:    string[];
  /**
   * 修改的文件列表
   */
  modifyFiles: string[];
  /**
   * 删除的文件列表
   */
  deleteFiles: string[];
  /**
   * 代码新增行数
   */
  insertion: number;
  /**
   * 代码删除行数
   */
  deletion: number;
}

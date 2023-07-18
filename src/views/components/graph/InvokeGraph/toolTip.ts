import { common } from '@/utils';
export default G6 => {
  const toolTip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    // itemTypes: ['node', 'edge'],
    itemTypes: ['node'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e) => {
      const model = e.item.getModel();
      const outDiv = document.createElement('div');
      outDiv.style.width = 'fit-content';
      outDiv.style.maxWidth = '500px';
      outDiv.style.wordBreak = 'break-all';
      //outDiv.style.padding = '0px 0px 20px 0px';
      // outDiv.innerHTML = `
      //   <h4>Custom Content</h4>
      //   <ul>
      //     <li>Type: ${e.item.getType()}</li>
      //   </ul>
      //   <ul>
      //     <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      //   </ul>`;
      outDiv.innerHTML = `
        <div>${common.i18n('function.name')}: ${model.functionName}</div>
        <div>${common.i18n('function.file_path')}: ${model.filePath}</div>
      `;
      return outDiv;
    },
    shouldBegin: (e) => {
      let res = true;
      switch (e.item.getModel().id) {
        case '1':
          res = false;
          break;
        case '2':
          if (e.target.get('name') === 'text-shape') res = true;
          else res = false;
          break;
        case '3':
          if (e.target.get('name') !== 'text-shape') res = true;
          else res = false;
          break;
        default:
          res = true;
          break;
      }
      return res;
    }
  });

  return toolTip;
};

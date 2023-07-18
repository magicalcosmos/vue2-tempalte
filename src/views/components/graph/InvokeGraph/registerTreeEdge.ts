export default G6 => {

  /**
   * 处理属性数据
   * @param properties 
   * @param node 需要处理的节点
   */
  const handleProperties = (properties, node) => {
    if (!properties || !node) {
      return;
    }
    Object.keys(properties).forEach(key => {
      node.attr(key, properties[key]);
    });
  };

  G6.registerEdge(
    'tree-edge',
    {
      draw(cfg, group) {
        const { startPoint, endPoint } = cfg;
        const hgap = Math.abs(endPoint.x - startPoint.x);

        const path = [
          ['M', startPoint.x, startPoint.y],
          [
            'C',
            startPoint.x + hgap / 4,
            startPoint.y,
            endPoint.x - hgap / 2,
            endPoint.y,
            endPoint.x,
            endPoint.y
          ]
        ];
        const targetModel = cfg.targetNode && cfg.targetNode.getModel();
        const shape = group.addShape('path', {
          attrs: Object.assign({
            stroke: '#AAB7C4',
            path
          }, targetModel.edgeStyle || cfg.edgeStyle),
          name: 'smooth-path-shape'
        });
        return shape;
      }
    }
  );
};

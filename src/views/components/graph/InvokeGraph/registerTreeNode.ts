export default G6 => {
  const defaultEdgeColor = '#A3B1BF';

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

  G6.registerNode(
    'tree-node',
    {
      drawShape: function drawShape(cfg, group) {
        const rect = group.addShape('rect', {
          attrs: Object.assign(
            {
              fill: '#fff',
              stroke: defaultEdgeColor,
              x: 5,
              y: 0,
              width: 1,
              cursor: 'pointer',
              height: 1
            },
            cfg.style || {},
            cfg.nodeStyle || {}
          ),
          name: 'rect-shape'
        });


        let enableStubWidthMore = 0;
        if (cfg.iconfont) {
          enableStubWidthMore = 18;

          // 为icon添加背景颜色
          // cfg.iconfont.bgColor && group.addShape('rect', {
          //   attrs: Object.assign({
          //     fill: '#ebaf4c',
          //     x: 0,
          //     y: -7,
          //     height: 15,
          //     width: 15
          //   }, cfg.iconfont.bgColor)
          // });

          // 添加iconfont
          group.addShape('text', {
            attrs: Object.assign({
              x: 8,
              y: 0,
              show: true,
              fontFamily: 'iconfont',
              textAlign: 'center',
              textBaseline: 'middle'
            }, cfg.iconfont),
            name: 'iconfont'
          });
        }
        const text = group.addShape('text', {
          attrs: Object.assign(
            {
              text: cfg.name,
              x: enableStubWidthMore,
              y: 0,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#666',
              cursor: 'pointer'
            },
            cfg.labelStyle || {},
            (cfg.labelCfg && cfg.labelCfg.style) || {}
          ),
          draggable: true,
          name: 'text-shape'
        });

        const bbox = text.getBBox();
        rect.attr({
          x: -4,
          y: -bbox.height / 2 - 6,
          width: bbox.width + 12 + enableStubWidthMore,
          height: bbox.height + 12
        });

        if (!cfg.end) {
          group.addShape('marker', {
            attrs: Object.assign(
              {
                x: bbox.width + 12 + enableStubWidthMore,
                y: 0,
                r: 6,
                symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
                stroke: defaultEdgeColor,
                fill: '#fff',
                cursor: 'pointer',
                lineWidth: 1
              },
              cfg.expandStyle || {}
            ),
            draggable: true,
            name: 'collapse-icon'
          });
        }
        return rect;
      },

      update: (cfg, item) => {
        const group = item.getContainer();
        const rectShape = group.find(e => e.get('name') === 'rect-shape');
        if (rectShape) {
          handleProperties(cfg.style, rectShape);
          handleProperties(cfg.nodeStyle, rectShape);
        }
        const iconfont = group.find(e => e.get('name') === 'iconfont');
        iconfont && handleProperties(cfg.iconfont, iconfont);

        const textShape = group.find(e => e.get('name') === 'text-shape');
        if (textShape) {
          handleProperties(cfg.labelStyle, textShape);
          handleProperties(cfg.labelCfg, textShape);
        }

        const collapseIcon = group.find(e => e.get('name') === 'collapse-icon');
        if (collapseIcon) {
          collapseIcon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
          handleProperties(cfg.expandStyle, collapseIcon);
        }
      }
    }
  );
};

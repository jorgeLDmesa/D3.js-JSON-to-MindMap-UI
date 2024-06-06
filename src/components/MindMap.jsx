import React, { useEffect } from 'react';
import * as d3 from 'd3';

const MindMap = ({ data }) => {
  useEffect(() => {
    // Limpiar el contenedor antes de renderizar el mapa mental
    const container = d3.select('#mindmap-container');
    container.selectAll('*').remove();

    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .append('g')
                  .attr('transform', 'translate(40,0)');

    const tree = d3.tree().size([height, width - 160]);

    const root = d3.hierarchy(data, (d) => d.children);

    // Ajustar el desplazamiento y para los nodos de los tres primeros niveles
    const adjustY = (node, depth) => {
      if (depth === 1) {
        return node.y / 2;  // Hacer los primeros brazos más cortos
      } else if (depth === 2) {
        return node.y / 1.5;  // Hacer los segundos brazos más cortos
      } else if (depth === 3) {
        return node.y / 1.2;  // Hacer los terceros brazos más cortos
      }
      return node.y;
    };

    svg.append('g')
       .selectAll('.link')
       .data(tree(root).links())
       .enter().append('line')
       .attr('class', 'link')
       .attr('x1', d => adjustY(d.source, d.source.depth) + 50)
       .attr('y1', d => d.source.x)
       .attr('x2', d => adjustY(d.target, d.target.depth) + 50)
       .attr('y2', d => d.target.x)
       .attr('stroke', '#ccc')
       .attr('stroke-width', 2);

    const node = svg.append('g')
                    .selectAll('.node')
                    .data(root.descendants())
                    .enter().append('g')
                    .attr('class', (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
                    .attr('transform', (d) => 'translate(' + (adjustY(d, d.depth) + 50) + ',' + d.x + ')');

    node.append('text')
        .attr('dy', 5)
        .attr('x', 0)
        .style('text-anchor', 'middle')
        .style('fill', '#fff')
        .style('font-size', '15px')
        .each(function (d) {
          const words = d.data.name.split(/\s+/);
          let line = [];
          let lineNumber = 0;
          const lineHeight = 1.1; // ems
          const y = 0;
          let tspan = d3.select(this).append('tspan').attr('x', 0).attr('y', y).attr('dy', `${lineNumber * lineHeight}em`);

          words.forEach((word, i) => {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > 140 && line.length > 1) { // approx 35 chars limit
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              lineNumber++;
              tspan = d3.select(this).append('tspan')
                .attr('x', 0)
                .attr('y', y)
                .attr('dy', `${lineNumber * lineHeight}em`)
                .text(word);
            }
          });
        })
        .each(function (d) {
            const bbox = this.getBBox();
            d.bbox = bbox;
        });

    node.insert('rect', 'text')
        .attr('x', d => d.bbox.x - 5)
        .attr('y', d => d.bbox.y - 5)
        .attr('width', d => d.bbox.width + 10)
        .attr('height', d => d.bbox.height + 10)
        .attr('fill', '#74ABC8')
        .attr('rx', 5)
        .attr('ry', 5);
  }, [data]);

  return <div id="mindmap-container" style={{ width: '90%', height: '100%', marginRight: '' }}></div>;
};

export default MindMap;

import { AfterViewInit, Component } from '@angular/core';
import { dia, format, shapes, ui, util } from '@joint/plus';
import '@joint/plus/joint-plus.css';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements AfterViewInit {

  ngAfterViewInit() {

    const namespace = shapes;
    const graph = new dia.Graph({}, { cellNamespace: namespace });

    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: 300,
      height: 300,
      background: { color: '#F5F5F5' },
      gridSize: 10, // Размер сетки
      drawGrid: true, // Включаем отрисовку сетки
      cellViewNamespace: namespace
    });

    const rect1 = new shapes.standard.Rectangle();
    rect1.position(25, 25);
    rect1.resize(180, 50);
    rect1.addTo(graph);

    const rect2 = new shapes.standard.Rectangle();
    rect2.position(95, 225);
    rect2.resize(180, 50);
    rect2.addTo(graph);

    rect1.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
    rect2.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });

    rect1.attr('label', { text: 'Hello', fill: '#353535' });
    rect2.attr('label', { text: 'World!', fill: '#353535' });

    const link = new shapes.standard.Link();
    link.source(rect1);
    link.target(rect2);
    link.addTo(graph);

    link.appendLabel({
      attrs: {
        text: {
          text: 'to the'
        }
      }
    });
    link.router('orthogonal');
    link.connector('straight', { cornerType: 'line' });

    const stencil = new ui.Stencil({
      paper: paper,
      width: 170,
      height: 100,
      layout: true,
      dropAnimation: true
    });
    stencil.render();

    const stencilContainer = document.getElementById('stencil');
    if (stencilContainer) {
      stencilContainer.appendChild(stencil.el);
    }

    const elements = [
      {
        type: 'standard.Rectangle',
        size: { width: 70, height: 50 },
        attrs: {
          body: {
            stroke: '#C94A46',
            rx: 2,
            ry: 2
          }
        }
      },
      {
        type: 'standard.Ellipse',
        size: { width: 70, height: 50 },
        attrs: {
          body: {
            stroke: '#C94A46',
          }
        }
      },
      {
        type: 'standard.Polygon',
        size: { width: 70, height: 50 },
        attrs: {
          body: {
            stroke: '#C94A46',
            points: 'calc(w/2),0 calc(w),calc(h/2) calc(w/2),calc(h) 0,calc(h/2)'
          }
        }
      },
      {
        type: 'standard.Cylinder',
        size: { width: 70, height: 50 },
        attrs: {
          body: {
            stroke: '#C94A46',
          },
          top: {
            fill: '#C94A46',
            stroke: '#C94A46'
          }
        }
      }
    ];
    stencil.load(elements);

    function openHalo(cellView) {
      new ui.Halo({ cellView: cellView }).render();
    }

    paper.on('cell:pointerup', (cellView) => {
      openHalo(cellView);
    });

    openHalo(paper.findViewByModel(rect1));

    const toolbar = new ui.Toolbar({
      tools: [
        {
          type: 'button',
          name: 'json',
          text: 'Export JSON'
        },
        {
          type: 'button',
          name: 'svg',
          text: 'Export SVG'
        },
        {
          type: 'button',
          name: 'zoom-in',
          text: 'Zoom In'
        },
        {
          type: 'button',
          name: 'zoom-out',
          text: 'Zoom Out'
        },
        {
          type: 'button',
          name: 'save-state',
          text: 'Save State'
        },
        {
          type: 'button',
          name: 'load-state',
          text: 'Load State'
        },
        {
          type: 'button',
          name: 'group-elements',
          text: 'Group Elements'
        },
        {
          type: 'button',
          name: 'export-png',
          text: 'Export PNG'
        },
        {
          type: 'button',
          name: 'increase-grid',
          text: 'Increase Grid Size'
        },
        {
          type: 'button',
          name: 'decrease-grid',
          text: 'Decrease Grid Size'
        }
      ]
    });
    toolbar.render();

    const toolbarContainer = document.getElementById('toolbar');
    if (toolbarContainer) {
      toolbarContainer.appendChild(toolbar.el);
    }

    toolbar.on('json:pointerclick', () => {
      const str = JSON.stringify(graph.toJSON());
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
      util.downloadBlob(blob, 'joint-plus.json');
    });

    toolbar.on('svg:pointerclick', () => {
      format.toSVG(
        paper,
        (svg) => {
          util.downloadDataUri(
            `data:image/svg+xml,${encodeURIComponent(svg)}`,
            'joint-plus.svg'
          );
        },
        { useComputedStyles: false }
      );
    });

    toolbar.on('zoom-in:pointerclick', () => {
      const scale = paper.scale();
      paper.scale(scale.sx * 1.2, scale.sy * 1.2);
    });

    toolbar.on('zoom-out:pointerclick', () => {
      const scale = paper.scale();
      paper.scale(scale.sx / 1.2, scale.sy / 1.2);
    });

    toolbar.on('save-state:pointerclick', () => {
      const graphState = JSON.stringify(graph.toJSON());
      localStorage.setItem('graphState', graphState);
      alert('Graph saved to localStorage!');
    });

    toolbar.on('load-state:pointerclick', () => {
      const graphState = localStorage.getItem('graphState');
      if (graphState) {
        graph.fromJSON(JSON.parse(graphState));
        alert('Graph restored from localStorage!');
      } else {
        alert('No saved state found.');
      }
    });

    toolbar.on('group-elements:pointerclick', () => {
      const elements = graph.getElements();
      if (elements.length > 0) {
        const parent = new dia.Element();
        graph.addCell(parent);
        elements.forEach(el => {
          parent.embed(el); // Добавляем элемент в составной родительский элемент
        });
        alert('Elements grouped successfully.');
      } else {
        alert('No elements to group.');
      }
    });

    toolbar.on('export-png:pointerclick', () => {
      format.toPNG(paper, (dataURL) => {
        util.downloadDataUri(dataURL, 'joint-plus.png');
      });
    });

    let currentGridSize = 10;
    toolbar.on('increase-grid:pointerclick', () => {
      currentGridSize += 5;
      paper.setGridSize(currentGridSize);
    });

    toolbar.on('decrease-grid:pointerclick', () => {
      currentGridSize = Math.max(1, currentGridSize - 5);
      paper.setGridSize(currentGridSize);
    });

    function openInspector(cell) {
      new ui.Inspector({
        cell: cell,
        inputs: {
          'attrs/body/fill': {
            type: 'color',
            label: 'Fill',
            group: 'presentation',
            index: 1
          },
          'attrs/label/text': {
            type: 'text',
            label: 'Text',
            group: 'content',
            index: 1
          }
        }
      }).render();
    }

    paper.on('element:pointerclick', function (cellView) {
      openInspector(cellView.model);
    });
  }
}

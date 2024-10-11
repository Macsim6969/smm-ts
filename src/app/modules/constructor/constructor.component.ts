import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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

    function openInspector(cell) {
      closeInspector(); // close inspector if currently open

      ui.Inspector.create('#inspector', {
        cell: cell,
        inputs: getInspectorConfig(cell)
      });
    }

    function closeInspector() {
      ui.Inspector.close();
    }

    function getInspectorConfig(cell) {
      if (cell.isElement()) {
        return {
          attrs: {
            label: {
              text: {
                type: 'content-editable',
                label: 'Label'
              }
            }
          }
        };

      } else { // cell.isLink()
        return {
          labels: {
            type: 'list',
            label: 'Labels',
            item: {
              type: 'object',
              properties: {
                attrs: {
                  text: {
                    text: {
                      type: 'content-editable',
                      label: 'Text',
                      defaultValue: 'label'
                    }
                  }
                },
                position: {
                  type: 'select-box',
                  options: [
                    { value: 30, content: 'Source' },
                    { value: 0.5, content: 'Middle' },
                    { value: -30, content: 'Target' }
                  ],
                  defaultValue: 0.5,
                  label: 'Position'
                }
              }
            }
          }
        };
      }
    }

    paper.on('cell:pointerdown', function (cellView) {
      openInspector(cellView.model);
    });

    stencil.on('element:drop', function (elementView) {
      openInspector(elementView.model);
    });

    paper.on('blank:pointerdown', function () {
      closeInspector(); // close inspector if currently open
    });

    openInspector(rect1);
  }

}

import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
} from '@angular/core';
import {
  BasicShapeModel,
  ConnectorModel,
  ContextMenuSettingsModel,
  Diagram,
  DiagramBeforeMenuOpenEventArgs,
  DiagramComponent,
  IBlazorConnectionChangeEventArgs,
  IDragEnterEventArgs,
  NodeModel,
  PaletteModel,
  PointPortModel,
  SelectorModel,
  SnapConstraints,
  SnapSettingsModel,
  SymbolInfo,
  SymbolPaletteComponent,
  UserHandleEventsArgs,
  UserHandleModel,
} from '@syncfusion/ej2-angular-diagrams';

import { ExpandMode, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { timer } from 'rxjs';
import { IElementData } from './models/form.interface';
import { DiagramService } from './services/diagram.service';
import { DataManager } from '@syncfusion/ej2-data';
import { DiagramInitDataService } from './services/diagram-init-data.service';
import { DiagramSidebarLogicService } from './services/diagram-sidebar-logic.service';
import { DiagramMainLogicService } from './services/diagram-main-logic.service';

export interface DraggableElement {
  id: number;
  type: string;
  properties: any;
}
@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './constructor.component.scss',
    '../../../../node_modules/@syncfusion/ej2-angular-diagrams/styles/material.css',
    '../../../../node_modules/@syncfusion/ej2-angular-base/styles/material.css',
    '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css',
    '../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css',
    '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css',
    '../../../../node_modules/@syncfusion/ej2-base/styles/material.css',
    '../../../../node_modules/@syncfusion/ej2-icons/styles/material.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorComponent {
  @ViewChild('diagram', { static: false }) public diagram: DiagramComponent;

  public diagramData: Diagram;
  public port: PointPortModel[];
  public expandMode: ExpandMode = 'Multiple';
  public palettes: PaletteModel[] | NodeModel[];
  public drawingshape?: BasicShapeModel;
  public palete: SymbolPaletteComponent;

  public handles!: UserHandleModel[];

  public selectedItems: SelectorModel = {
    userHandles: this.handles,
  };

  public elementData: IElementData;
  public diagramsLogicData: {
    [elementId: string]: IElementData[];
  }[] = [];

  public contextMenuSettings: ContextMenuSettingsModel;

  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: {
      snapIntervals: [10],
    },
    verticalGridlines: {
      snapIntervals: [10],
    },
    constraints: SnapConstraints.None,
  };

  public items?: DataManager;
  public stageElement: string;
  public isGridEnabled: boolean = false;
  public isActiveStage = 'diagram';

  constructor(
    private diagramService: DiagramService,
    private diagramInitDataService: DiagramInitDataService,
    private diagramSidebarLogicService: DiagramSidebarLogicService,
    private diagramMainLogicService: DiagramMainLogicService,
    private renderer: Renderer2
  ) {}

  public enableGrid(): void {
    this.snapSettings.constraints =
      SnapConstraints.ShowLines | SnapConstraints.SnapToLines;
    this.diagram.snapSettings = { ...this.snapSettings };
    this.isGridEnabled = true;
  }

  public disableGrid(): void {
    this.snapSettings.constraints = SnapConstraints.None;
    this.diagram.snapSettings = { ...this.snapSettings };
    this.isGridEnabled = false;
  }

  public choiceStageDyagrams(id: string) {
    this.diagramMainLogicService.saveDiagram(this.diagram, this.isActiveStage);

    this.isActiveStage = id;
    this.loadDiagram(id);
  }

  ngOnInit(): void {
    this.initializeDiagramSettingsData();

    // Initialize the diagram first
    this.diagramData = new Diagram({
      width: '100%',
      height: '100%',
    });

    this.diagram?.appendTo('#diagram');
  }

  ngAfterViewInit(): void {
    this.loadDiagram('diagram');
    this.loadSidebarTitle();
  }

  private initializeDiagramSettingsData(): void {
    this.port = this.diagramInitDataService._portSettings;
    this.palettes = this.diagramInitDataService._palettesData;
    this.contextMenuSettings = this.diagramInitDataService._contextMenuSettings;
    this.handles = this.diagramInitDataService._handlesData;
  }

  private loadDiagram(activeDiagram: string) {
    timer(250).subscribe(() => {
      this.diagramMainLogicService
        .getDiagramDataFromBack(activeDiagram)
        .subscribe((diagramData: any) => {
          if (diagramData) {
            try {
              const data =
                typeof diagramData === 'string'
                  ? JSON.parse(diagramData)
                  : diagramData;
              this.diagram.loadDiagram(data);
            } catch (error) {
              console.error('Ошибка при загрузке диаграммы:', error);
            }
          } else {
            const windowHeight = window.innerHeight - 100;
            timer(0).subscribe(() => {
              const swimlane1: NodeModel = {
                id: 'Swimlane1',
                width: 500,
                height: windowHeight,
                shape: {
                  type: 'SwimLane',
                  orientation: 'Vertical',
                  lanes: [
                    {
                      id: 'Lane1',
                      height: 100,
                      style: { fill: '#f8f8f8' },
                      canMove: false,
                      header: {
                        annotation: { content: 'Stage 1' },
                        style: {
                          fill: '#e0e0e0',
                          color: 'black',
                          fontSize: 16,
                        },
                      },
                    },
                  ],
                },
                offsetX: 100,
                offsetY: 100,
              };

              const swimlane2: NodeModel = {
                id: 'Swimlane2',
                width: 500,
                height: windowHeight,
                shape: {
                  type: 'SwimLane',
                  orientation: 'Vertical',
                  lanes: [
                    {
                      id: 'Lane2',
                      height: 100,
                      style: { fill: '#e8f4fc' },
                      header: {
                        annotation: { content: 'Stage 2' },
                        style: {
                          fill: 'transparent',
                          color: 'black',
                          fontSize: 16,
                        },
                      },
                    },
                  ],
                },
                offsetX: 600,
                offsetY: 100,
              };

              const swimlane3: NodeModel = {
                id: 'Swimlane3',
                width: 500,
                height: windowHeight,
                shape: {
                  type: 'SwimLane',
                  orientation: 'Vertical',
                  lanes: [
                    {
                      id: 'Lane3',
                      height: 100,
                      style: { fill: '#e4fcef' },
                      header: {
                        annotation: { content: 'Stage 3' },
                        style: {
                          fill: '#e0e0e0',
                          color: 'black',
                          fontSize: 16,
                        },
                      },
                    },
                  ],
                },
                offsetX: 1100,
                offsetY: 100,
              };

              this.diagram.add(swimlane1);
              this.diagram.add(swimlane2);
              this.diagram.add(swimlane3);
            });
          }
        });
    });
  }

  private loadSidebarTitle() {
    const container = document.querySelector('#symbolpalette') as HTMLElement;
    if (container) {
      this.diagramSidebarLogicService.createSidebarTitle(
        container,
        this.renderer
      );
    }
  }

  public created(): void {
    if (this.diagram) {
      this.diagram.fitToPage();
    }
  }

  public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    if (
      connector.id.indexOf('straight') !== -1 ||
      connector.id.indexOf('straightdashed') !== -1
    ) {
      connector.type = 'Straight';
    } else {
      connector.type = 'Orthogonal';
    }
    let color = '#717171';

    connector.targetDecorator.style.strokeColor = 'transparent';
    connector.targetDecorator.style.fill = color;
    connector.style.strokeColor = 'transparent';
    connector.style.strokeWidth = 0;
    return connector;
  }
  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return {
      fit: true,
      description: { text: symbol?.addInfo?.['tooltip'] },
      tooltip: symbol?.addInfo ? symbol?.addInfo?.['tooltip'] : symbol.id,
    };
  }

  public getNodeDefaults(node: NodeModel): NodeModel {
    node.style.strokeColor = 'transparent';
    node.style.strokeWidth = 0;
    return node;
  }

  public dragEnter(arg: IDragEnterEventArgs): void {
    this.diagramMainLogicService.handleDragEnter(
      arg,
      this.diagramsLogicData,
      this.diagram,
      this.isActiveStage
    );
  }

  public dragLeave(): void {
    this.diagramMainLogicService.saveDiagram(this.diagram, this.isActiveStage);
  }

  public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
    const srcElement = args.event.srcElement as HTMLElement;
    const ariaLabel = srcElement
      ? srcElement?.getAttribute('aria-label')
      : 'aria-label не найден';

    if (srcElement) {
      const computedStyle = window.getComputedStyle(srcElement);
      const id = srcElement?.getAttribute('id');
      const stroke =
        srcElement?.getAttribute('stroke') ||
        computedStyle.getPropertyValue('stroke');
      const strokeWidth =
        srcElement?.getAttribute('stroke-width') ||
        computedStyle.getPropertyValue('stroke-width');
      const fill =
        srcElement?.getAttribute('fill') ||
        computedStyle.getPropertyValue('fill');

      this.elementData = {
        ...this.elementData,
        id,
        stroke,
        strokeWidth: +strokeWidth,
        fill,
        label: ariaLabel,
      };
    }

    for (let item of args.items) {
      if (
        this.diagram.selectedItems.connectors.length +
          this.diagram.selectedItems.nodes.length >
        0
      ) {
        if (item.id === 'InsertLaneBefore' || item.id === 'InsertLaneAfter') {
          if (
            this.diagram.selectedItems.connectors.length ||
            (this.diagram.selectedItems.nodes.length &&
              !(this.diagram.selectedItems.nodes[0] as Node | any).isLane)
          ) {
            args.hiddenItems.push(item.text);
          }
        }
      } else {
        args.hiddenItems.push(item.text);
      }
    }
  }

  public contextMenuClick(args: MenuEventArgs): void {
    const selectedNode = (this.diagram as any)?.selectedItems?.nodes?.[0];
    this.diagramMainLogicService.handleContextMenuClick(
      args,
      this.diagram,
      selectedNode,
      this.elementData
    );
  }

  public connectionChange(args: IBlazorConnectionChangeEventArgs): void {
    if (args.state === 'Changing') {
      const sourceNode = args.connector.sourceID;
      const targetNode = args.connector.targetID;

      if (sourceNode && targetNode && sourceNode !== targetNode) {
        if (!this.diagramsLogicData[sourceNode]) {
          this.diagramsLogicData[sourceNode] = {
            id: sourceNode,
          };
        }

        if (!this.diagramsLogicData[sourceNode]['connection']) {
          this.diagramsLogicData[sourceNode]['connection'] = {
            from: sourceNode,
            to: [],
          };
        }

        this.diagramsLogicData[sourceNode]['connection']['from'] = sourceNode;
        if (
          !this.diagramsLogicData[sourceNode]['connection']['to'].includes(
            targetNode
          )
        ) {
          this.diagramsLogicData[sourceNode]['connection']['to'].push(
            targetNode
          );
        }
        this.diagramMainLogicService.saveDiagram(
          this.diagram,
          this.isActiveStage
        );
      }
    }
  }

  public checkToChange(): void {
    this.diagramMainLogicService.saveDiagram(this.diagram, this.isActiveStage);
  }

  public selectionChange(event: any): void {
    if (event.type === 'Removal' && event.oldValue[0]) {
      const sourceNode = event.oldValue[0].sourceID;
      const targetNode = event.oldValue[0].targetID;

      if (
        sourceNode &&
        targetNode &&
        this.diagramsLogicData[sourceNode]['connection'] &&
        !Array.isArray(this.diagramsLogicData[sourceNode]['connection'])
      ) {
        const connection = this.diagramsLogicData[sourceNode][
          'connection'
        ] as any;

        if (connection.from === sourceNode) {
          const targetIndex = connection.to.indexOf(targetNode);

          if (targetIndex !== -1) {
            connection.to.splice(targetIndex, 1);
          } else {
            console.warn("Target node not found in 'to' array.");
          }
        }
      }
      this.diagramMainLogicService.saveDiagram(
        this.diagram,
        this.isActiveStage
      );
    }
  }

  public postData(): void {
    this.diagramService.sendDiagramLogic(this.diagramsLogicData);
  }

  public changeText(args: any): void | boolean {
    if (args.diagramAction === 'TextEdit') {
      this.diagramMainLogicService.saveDiagram(
        this.diagram,
        this.isActiveStage
      );
    } else {
      return false;
    }
  }

  public onUserHandleMouseDown(args: UserHandleEventsArgs): void {
    if (args.element['properties'].name === 'Clone') {
      (this.diagram as DiagramComponent).copy();
      (this.diagram as DiagramComponent).paste();
    } else if (args.element['properties'].name === 'Delete') {
      (this.diagram as DiagramComponent).remove();
    }
  }
}

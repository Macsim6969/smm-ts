import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {
  BasicShapeModel,
  cloneObject,
  ConnectorModel,
  ContextMenuSettingsModel,
  DiagramBeforeMenuOpenEventArgs,
  DiagramComponent,
  HeaderModel,
  IBlazorConnectionChangeEventArgs,
  IDragEnterEventArgs,
  LaneModel,
  NodeModel,
  PaletteModel,
  PointPortModel,
  PortConstraints,
  PortVisibility,
  randomId,
  SelectorConstraints,
  SelectorModel,
  ShapeStyleModel,
  SnapConstraints,
  SnapSettingsModel,
  SwimLaneModel,
  SymbolInfo,
  SymbolPaletteComponent,
} from '@syncfusion/ej2-angular-diagrams';

import { ExpandMode, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { timer } from 'rxjs';
import { IElementData } from './models/form.interface';
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
    '../../../../node_modules/@syncfusion/ej2-icons/styles/material.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorComponent {
  @ViewChild('diagram', { static: false }) public diagram: DiagramComponent;
  createdElements: NodeModel[] = [];
  public port: PointPortModel[] = [
    {
      id: 'Port1',
      offset: { x: 0, y: 0.5 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: 'Port2',
      offset: { x: 0.5, y: 0 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: 'Port3',
      offset: { x: 1, y: 0.5 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: 'Port4',
      offset: { x: 0.5, y: 1 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
  ];

  public expandMode: ExpandMode = 'Multiple';
  public palettes: PaletteModel[] = [
    {
      id: 'flow',
      expanded: true,
      title: 'Flow Shapes',
      symbols: [
        {
          id: 'Start',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            classShape: {
              methods: [],
              name: 'Start',
            },
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Start',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          // Adding the node annotations here
          addInfo: {
            annotations: [
              {
                id: 'label1',
                content: 'Rectangle1',
                horizontalAlignment: 'Center', // Or use 'Left'/'Right' based on your preference
              },
            ],
          },
        },
        {
          id: 'Terminator',
          addInfo: { tooltip: 'Terminator' },
          width: 50,
          height: 60,
          shape: { type: 'Flow', shape: 'Terminator' },
          ports: this.port,
          annotations: [
            {
              content: 'Terminator',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Process',
          addInfo: { tooltip: 'Process' },
          width: 50,
          height: 60,
          shape: { type: 'Flow', shape: 'Process' },
          ports: this.port,
          annotations: [
            {
              content: 'Process',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Decision',
          addInfo: { tooltip: 'Decision' },
          width: 50,
          height: 50,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          annotations: [
            {
              content: 'Decision',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Document',
          addInfo: { tooltip: 'Document' },
          width: 50,
          height: 50,
          shape: { type: 'Flow', shape: 'Document' },
          ports: this.port,
          annotations: [
            {
              content: 'Document',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Predefinedprocess',
          addInfo: { tooltip: 'Predefined process' },
          width: 50,
          height: 50,
          shape: { type: 'Flow', shape: 'PreDefinedProcess' },
          ports: this.port,
          annotations: [
            {
              content: 'PreDefined Process',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Data',
          addInfo: { tooltip: 'Data' },
          width: 50,
          height: 50,
          shape: { type: 'Flow', shape: 'Data' },
          ports: this.port,
          annotations: [
            {
              content: 'Data',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
      ],
    },
    {
      id: 'swimlaneShapes',
      expanded: true,
      title: 'Swimlane Shapes',
      symbols: [
        {
          id: 'Horizontalswimlane',
          addInfo: { tooltip: 'Horizontal swimlane' },
          shape: {
            type: 'SwimLane',
            lanes: [
              {
                id: 'lane1',
                height: 60,
                width: 150,
                header: { width: 50, height: 50, style: { fontSize: 11 } },
              },
            ],
            orientation: 'Horizontal',
            isLane: true,
          },
          height: 60,
          width: 140,
          offsetX: 70,
          offsetY: 30,
        },
        {
          id: 'Verticalswimlane',
          addInfo: { tooltip: 'Vertical swimlane' },
          shape: {
            type: 'SwimLane',
            lanes: [
              {
                id: 'lane1',
                height: 150,
                width: 60,
                header: { width: 50, height: 50, style: { fontSize: 11 } },
              },
            ],
            orientation: 'Vertical',
            isLane: true,
          },
          height: 140,
          width: 60,
          offsetX: 70,
          offsetY: 30,
        },
        {
          id: 'Verticalphase',
          addInfo: { tooltip: 'Vertical phase' },
          shape: {
            type: 'SwimLane',
            phases: [{ style: { strokeDashArray: '3,3' } }],
            annotations: [{ text: '' }],
            orientation: 'Vertical',
            isPhase: true,
          },
          height: 60,
          width: 140,
        },
        {
          id: 'Horizontalphase',
          addInfo: { tooltip: 'Horizontal phase' },
          shape: {
            type: 'SwimLane',
            phases: [{ style: { strokeDashArray: '3,3' } }],
            annotations: [{ text: '' }],
            orientation: 'Horizontal',
            isPhase: true,
          },
          height: 60,
          width: 140,
        },
      ],
    },
    {
      id: 'connectors',
      expanded: true,
      symbols: [
        {
          id: 'orthogonal',
          type: 'Orthogonal',
          sourcePoint: { x: 0, y: 0 },
          targetPoint: { x: 40, y: 40 },
        },
        {
          id: 'orthogonaldashed',
          type: 'Orthogonal',
          sourcePoint: { x: 0, y: 0 },
          targetPoint: { x: 40, y: 40 },
          style: { strokeDashArray: '4 4' },
        },
        {
          id: 'straight',
          type: 'Straight',
          sourcePoint: { x: 0, y: 0 },
          targetPoint: { x: 60, y: 60 },
        },
        {
          id: 'straightdashed',
          type: 'Straight',
          sourcePoint: { x: 0, y: 0 },
          targetPoint: { x: 60, y: 60 },
          style: { strokeDashArray: '4 4' },
        },
      ],
      title: 'Connectors',
    },
  ];
  public drawingshape?: BasicShapeModel;

  public palete: SymbolPaletteComponent;
  public selectedItems: SelectorModel;
  public elementData: IElementData;
  public diagramsLogicData: {
    [elementId: string]: IElementData[];
  }[] = [];

  elements: DraggableElement[] = [];
  nextId: number = 1;
  saveData: any;
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedItems = {
      constraints: SelectorConstraints.All & ~SelectorConstraints.Rotate,
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = localStorage.getItem('diagram');
      const diagramLogic = localStorage.getItem('diagramLogicData');
      if (data && diagramLogic) {
        try {
          this.diagram.loadDiagram(data);
          this.diagramsLogicData = JSON.parse(diagramLogic);
        } catch (error) {
          console.error('Ошибка при загрузке диаграммы:', error);
        }
      }
    }, 1500);
  }

  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: {
      snapIntervals: [10],
    },
    verticalGridlines: {
      snapIntervals: [10],
    },
    constraints: SnapConstraints.All,
  };
  public created(): void {
    if (this.diagram) {
      this.diagram.fitToPage();
    }
  }

  public contextMenuSettings: ContextMenuSettingsModel = {
    show: true,
    items: [
      {
        text: 'Settings',
        id: 'Settings',
        target: '.e-diagramcontent',
        iconCss: 'e-icons e-settings',
      },
      {
        text: 'Clone',
        id: 'Clone',
        target: '.e-diagramcontent',
        iconCss: 'e-icons e-copy',
      },
      {
        text: 'Cut',
        id: 'Cut',
        target: '.e-diagramcontent',
        iconCss: 'e-icons e-cut',
      },
      {
        text: 'Paste',
        id: 'Paste',
        target: '.e-diagramcontent',
        iconCss: 'e-icons e-paste',
      },
      {
        text: 'InsertLaneBefore',
        id: 'InsertLaneBefore',
        target: '.e-diagramcontent',
      },
      {
        text: 'InsertLaneAfter',
        id: 'InsertLaneAfter',
        target: '.e-diagramcontent',
      },
    ],
    showCustomMenuOnly: true,
  };

  public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    if (
      connector.id.indexOf('straight') !== -1 ||
      connector.id.indexOf('straightdashed') !== -1
    ) {
      connector.type = 'Straight';
    } else {
      connector.type = 'Orthogonal';
    }
    var color = '#717171';

    connector.targetDecorator.style.strokeColor = color;
    connector.targetDecorator.style.fill = color;
    connector.style.strokeColor = color;
    connector.style.strokeWidth = 1;
    return connector;
  }
  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
  }

  public getNodeDefaults(node: NodeModel): NodeModel {
    node.style.strokeColor = '#717171';
    node.style.strokeWidth = 1;
    return node;
  }

  public dragEnter(arg: IDragEnterEventArgs): void {
    if (arg.element instanceof Node) {
      let shape: SwimLaneModel = arg.element.shape as SwimLaneModel;
      if (shape.isLane) {
        if (shape.orientation === 'Horizontal') {
          shape.lanes[0].height = 100;
          shape.lanes[0].width = 500;
        } else if (shape.orientation === 'Vertical') {
          shape.lanes[0].height = 500;
          shape.lanes[0].width = 100;
        }
      }
    }

    this.saveDiagram();
  }

  public dragLeave() {
    this.saveDiagram();
  }

  public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
    const srcElement = args.event.srcElement as HTMLElement;
    const ariaLabel = srcElement
      ? srcElement.getAttribute('aria-label')
      : 'aria-label не найден';

    if (srcElement) {
      const computedStyle = window.getComputedStyle(srcElement);
      const id = srcElement.getAttribute('id');
      const stroke =
        srcElement.getAttribute('stroke') ||
        computedStyle.getPropertyValue('stroke');
      const strokeWidth =
        srcElement.getAttribute('stroke-width') ||
        computedStyle.getPropertyValue('stroke-width');
      const fill =
        srcElement.getAttribute('fill') ||
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
    if (
      args.item.id === 'InsertLaneBefore' ||
      args.item.id === 'InsertLaneAfter'
    ) {
      if (
        this.diagram.selectedItems.nodes.length > 0 &&
        (this.diagram.selectedItems.nodes[0] as Node | any).isLane
      ) {
        let index: number;
        let node: Node = this.diagram.selectedItems.nodes[0] as Node;
        let swimlane: NodeModel = this.diagram.getObject(
          (this.diagram.selectedItems.nodes[0] as Node | any).parentId
        );
        let shape: SwimLaneModel = swimlane.shape as SwimLaneModel;
        let existingLane: LaneModel = cloneObject(shape.lanes[0]);

        let newLane: LaneModel = {
          id: randomId(),
          header: {
            width: existingLane.header.width,
            height: existingLane.header.height,
            style: existingLane.header.style as ShapeStyleModel,
          } as HeaderModel,
          style: existingLane.style as ShapeStyleModel,
          height: existingLane.height,
          width: existingLane.width,
        } as LaneModel;

        if (shape.orientation === 'Horizontal') {
          let exclude = 0;
          exclude += shape.header ? 1 : 0;
          exclude += shape.phases.length ? 1 : 0;
          index = (node as any).rowIndex - exclude;
          newLane.header.width = existingLane.header.width;
          newLane.header.height = existingLane.height;
        } else {
          index = (node as any).columnIndex - shape.phases.length ? 1 : 0;
          newLane.header.width = existingLane.width;
          newLane.header.height = existingLane.header.height;
        }
        if (args.item.id === 'InsertLaneBefore') {
          this.diagram.addLanes(swimlane, [newLane], index);
        } else {
          this.diagram.addLanes(swimlane, [newLane], index + 1);
        }
        this.diagram.clearSelection();
      }
    } else if (args.item.id === 'Cut') {
      this.diagram.cut();
    } else if (args.item.id === 'Clone') {
      this.diagram.copy();
    } else if (args.item.id === 'Paste') {
      this.diagram.paste();
    } else if (args.item.id === 'Settings') {
      this.matDialog.closeAll();
      this.onOpenDialog();
    }
  }

  onOpenDialog(): void {
    const dialogRef = this.matDialog.open(SettingsDialogComponent, {
      width: '260px',
      data: {
        element: this.elementData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.elementData = result;
      }
    });
  }

  public connectionChange(args: IBlazorConnectionChangeEventArgs): void {
    if (args.state === 'Changing') {
      const sourceNode = args.connector.sourceID;
      const targetNode = args.connector.targetID;
  
      if (sourceNode && targetNode && sourceNode !== targetNode) {

        if (!this.diagramsLogicData[sourceNode]) {
          this.diagramsLogicData[sourceNode] = {
            id: sourceNode
          };
        }
  
    
        if (!this.diagramsLogicData[sourceNode]['connection']) {
          this.diagramsLogicData[sourceNode]['connection'] = {
            from: sourceNode,
            to: []
          };
        }

        this.diagramsLogicData[sourceNode]['connection']['from'] = sourceNode;
        if (!this.diagramsLogicData[sourceNode]['connection']['to'].includes(targetNode)) {
          this.diagramsLogicData[sourceNode]['connection']['to'].push(targetNode);
        }

        this.saveDiagram();
      }
    }
  }
  

  public checkToChange() {
    this.saveDiagram();
  }

  public selectionChange(event: any) {
    if (event.type === 'Removal' && event.oldValue[0]) {
      const sourceNode = event.oldValue[0].sourceID;
      const targetNode = event.oldValue[0].targetID;

      if (sourceNode && targetNode && this.diagramsLogicData[sourceNode]['connection']) {
        if (this.diagramsLogicData[sourceNode]['connection']['from'] === sourceNode) {
          const index = this.diagramsLogicData[sourceNode]['connection']['to'].indexOf(targetNode);
          if (index !== -1) {
            this.diagramsLogicData[sourceNode]['connection']['to'].splice(index, 1);
            this.saveDiagram();
          }
        }
      }
    }
  }

  private saveDiagram() {
    timer(250).subscribe(() => {
      this.saveData = this.diagram.saveDiagram();
      // const data = JSON.stringify(this.diagramsLogicData)
      localStorage.setItem('diagram', this.saveData);
      // localStorage.setItem('diagramLogicData', data);
    });
  }
}

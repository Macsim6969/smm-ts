import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
  BasicShapeModel,
  cloneObject,
  ConnectorModel,
  ContextMenuSettingsModel,
  DiagramBeforeMenuOpenEventArgs,
  DiagramComponent,
  HeaderModel,
  IDragEnterEventArgs,
  LaneModel,
  NodeModel,
  PageSettingsModel,
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

let pathData: string =
  'M 120 24.9999 C 120 38.8072 109.642 50 96.8653 50 L 23.135' +
  ' 50 C 10.3578 50 0 38.8072 0 24.9999 L 0 24.9999 C' +
  '0 11.1928 10.3578 0 23.135 0 L 96.8653 0 C 109.642 0 120 11.1928 120 24.9999 Z';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorComponent {
  @ViewChild('diagram')
  public diagram: DiagramComponent;
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
  //Disable the rotate constrains for selected nodes
  ngOnInit(): void {
    
    this.selectedItems = {
      constraints: SelectorConstraints.All & ~SelectorConstraints.Rotate,
    };
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
    this.diagram.fitToPage();
  }
  //Define custom menu items
  public contextMenuSettings: ContextMenuSettingsModel = {
    show: true,
    items: [
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
  //Set the default values of a Connector.
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
    //set styles for connector
    connector.targetDecorator.style.strokeColor = color;
    connector.targetDecorator.style.fill = color;
    connector.style.strokeColor = color;
    connector.style.strokeWidth = 1;
    return connector;
  }
  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
  }
  //Set the default values of a node.
  public getNodeDefaults(node: NodeModel): NodeModel {
    node.style.strokeColor = '#717171';
    node.style.strokeWidth = 1;
    return node;
  }
  //Set the node style for the DragEnter element.
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
  }
  //Open the context menu
  public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
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
  //Handle click event for menu items.
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
    }
  }

  rotateSelectedNode(angle: number): void {
    const selectedNode: NodeModel = this.selectedItems.nodes[0]; // Получаем первый выбранный узел
    if (selectedNode) {
      selectedNode.rotateAngle = (selectedNode.rotateAngle + angle) % 360; // Изменяем угол поворота
      this.diagram.dataBind(); // Обновляем диаграмму
    }
  }
}

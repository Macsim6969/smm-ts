import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
} from '@angular/core';
import {
  BasicShapeModel,
  cloneObject,
  ConnectorModel,
  ContextMenuSettingsModel,
  Diagram,
  DiagramBeforeMenuOpenEventArgs,
  DiagramComponent,
  HeaderModel,
  IBlazorConnectionChangeEventArgs,
  IDragEnterEventArgs,
  LaneModel,
  NodeModel,
  PaletteModel,
  PointPortModel,
  randomId,
  SelectorModel,
  ShapeStyleModel,
  SnapConstraints,
  SnapSettingsModel,
  SwimLaneModel,
  SymbolInfo,
  SymbolPaletteComponent,
  UserHandleEventsArgs,
  UserHandleModel,
} from '@syncfusion/ej2-angular-diagrams';

import { ExpandMode, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
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
  public expandMode: ExpandMode = 'Single';
  public palettes: PaletteModel[];
  public drawingshape?: BasicShapeModel;
  public palete: SymbolPaletteComponent;

  public handles: UserHandleModel[] = [
    {
      name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z', tooltip: { content: 'Clone' },
      visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    }
  ];

  public selectedItems: SelectorModel = {
    userHandles: this.handles
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
  public isGridEnabled!: boolean;
  public isActiveStage: boolean[] = [true];
  constructor(
    private matDialog: MatDialog,
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

  // Метод для отключения сетки
  public disableGrid(): void {
    this.snapSettings.constraints = SnapConstraints.None;
    this.diagram.snapSettings = { ...this.snapSettings };
    this.isGridEnabled = false;
  }

  public choiceStageDyagrams(id: number){
    this.isActiveStage = [];
    this.isActiveStage[id] = true;
  }

  ngOnInit(): void {
    this.initializeDiagramSettingsData();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.diagramData = new Diagram({
      width: '100%',
      height: '100%',
      nodes: [],
      dragEnter: (args) => {
        if (args.element.id === 'Horizontalswimlane') {
          const updatedSwimlane = this.diagramInitDataService.getSwimlaneNode(
            screenWidth,
            screenHeight
          );
          Object.assign(args.element, updatedSwimlane);
        }
      },
    });

    this.diagram?.appendTo('#diagram');
  }

  ngAfterViewInit(): void {
    this.loadDiagram();
    this.loadSidebarTitle();
  }

  private openSidebar(container: HTMLElement) {
    this.diagramSidebarLogicService.createSidebarTitle(
      container,
      this.renderer
    );
  }

  private initializeDiagramSettingsData(): void {
    this.port = this.diagramInitDataService._portSettings;
    this.palettes = this.diagramInitDataService._palettesData;
    this.contextMenuSettings = this.diagramInitDataService._contextMenuSettings;
  }

  private loadDiagram() {
    timer(450).subscribe(() => {
      const data = localStorage.getItem('diagram');

      if (data) {
        try {
          this.diagram.loadDiagram(data);
        } catch (error) {
          console.error('Ошибка при загрузке диаграммы:', error);
        }
      }
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
    var color = '#717171';

    connector.targetDecorator.style.strokeColor = color;
    connector.targetDecorator.style.fill = color;
    connector.style.strokeColor = color;
    connector.style.strokeWidth = 1;
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
    node.style.strokeColor = '#717171';
    node.style.strokeWidth = 1;
    return node;
  }

  public dragEnter(arg: IDragEnterEventArgs): void {
    const elementId = arg.element['changedProperties']['id'];

    if (!this.diagramsLogicData[elementId]) {
      this.diagramsLogicData[elementId] = {};
    }

    this.diagramsLogicData[elementId]['id'] = elementId;
    this.diagramsLogicData[elementId]['label'] =
      arg.element['oldProperties']?.['id'];

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
    this.diagramMainLogicService.saveDiagram(this.diagram);
  }

  public dragLeave(): void {
    this.diagramMainLogicService.saveDiagram(this.diagram);
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
    let selectedNode = (this.diagram as any)?.selectedItems?.nodes?.[0];
    this.stageElement = selectedNode.addInfo.stage;

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
    } else if (args.item.id === 'Settings') {
      this.matDialog.closeAll();
      this.onOpenDialog();
    } else if (
      selectedNode &&
      args.item.id !== 'fill' &&
      args.item.id !== 'annotationText'
    ) {
      if (
        args.item.text === 'Red' ||
        args.item.text === 'Blue' ||
        args.item.text === 'Yellow' ||
        args.item.text === 'Green'
      ) {
        selectedNode.style.fill = args.item.text;
        (this.diagram as any).dataBind();
      } else if (
        args.item.text === 'Standard' ||
        args.item.text === 'Emergency' ||
        args.item.text === 'Planned' ||
        args.item.text === 'Unscheduled'
      ) {
        selectedNode.annotations[0].content = args.item.text;
        (this.diagram as any).dataBind();
      }
      (this.diagram as any).dataBind();
      this.diagramMainLogicService.saveDiagram(this.diagram);
    }
  }

  private onOpenDialog(): void {
    const dialogRef = this.matDialog.open(SettingsDialogComponent, {
      width: '260px',
      data: {
        element: this.elementData,
        stage: this.stageElement,
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
        this.diagramMainLogicService.saveDiagram(this.diagram);
      }
    }
  }

  public checkToChange(): void {
    this.diagramMainLogicService.saveDiagram(this.diagram);
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
      this.diagramMainLogicService.saveDiagram(this.diagram);
    }
  }

  public postData(): void {
    this.diagramService.sendDiagramLogic(this.diagramsLogicData);
  }

  public changeText(args: any): void | boolean {
    if (args.diagramAction === 'TextEdit') {
      this.diagramMainLogicService.saveDiagram(this.diagram);
    } else {
      return false;
    }
  }

  public onUserHandleMouseDown(args: UserHandleEventsArgs): void {
    if (args.element) {
      //To clone the selected node
      (this.diagram as DiagramComponent).copy();
      (this.diagram as DiagramComponent).paste();
    }
  }
}

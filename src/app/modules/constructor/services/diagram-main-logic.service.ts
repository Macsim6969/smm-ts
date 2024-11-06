import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  cloneObject,
  Diagram,
  DiagramComponent,
  IDragEnterEventArgs,
  LaneModel,
  NodeModel,
  randomId,
  SwimLaneModel,
} from '@syncfusion/ej2-angular-diagrams';
import { timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Injectable()
export class DiagramMainLogicService {
  private saveData: any;
  private stageElement: string;

  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {}

  public saveDiagram(
    diagram: DiagramComponent | Diagram,
    diagramId: string
  ): void {
    timer(250).subscribe(() => {
      this.saveData = diagram.saveDiagram();
      this.httpClient
        .put(
          `https://smm-st-19042-default-rtdb.firebaseio.com/diagram/${diagramId}.json`,
          JSON.stringify(this.saveData)
        )
        .subscribe();
    });
  }

  public getDiagramDataFromBack(diagramId: string) {
    return this.httpClient.get(
      `https://smm-st-19042-default-rtdb.firebaseio.com/diagram/${diagramId}.json`
    );
  }

  ///////
  public handleDragEnter(
    arg: IDragEnterEventArgs,
    diagramsLogicData: any,
    diagram: Diagram,
    isActiveStage: string
  ): void {
    const elementId = arg.element['changedProperties']['id'];

    if (!diagramsLogicData[elementId]) {
      diagramsLogicData[elementId] = {};
    }
    console.log(arg.element['properties'].addInfo.stage === 'RFX_Tender');
    if (
      arg.element['properties'].addInfo.stage === 'Applications' ||
      arg.element['properties'].addInfo.stage === 'RFX_Tender'
    ) {
      arg.element['width'] = 150;
      arg.element['height'] = 60;
      arg.element['maxWidth'] = 200;
      arg.element['maxHeight'] = 110;
      arg.element['minWidth'] = 120;
      arg.element['minHeight'] = 60;
    } else if (arg.element['properties'].addInfo.stage === 'Trigger') {
      arg.element['width'] = 100;
      arg.element['height'] = 100;
      arg.element['maxWidth'] = 200;
      arg.element['maxHeight'] = 200;
      arg.element['minWidth'] = 80;
      arg.element['minHeight'] = 80;
    } else if (
      arg.element['properties'].addInfo.stage === 'Counterparty_verification' ||
      arg.element['properties'].addInfo.stage === 'Electronic_signature'
    ) {
      arg.element['width'] = 100;
      arg.element['height'] = 80;
      arg.element['maxWidth'] = 150;
      arg.element['maxHeight'] = 120;
      arg.element['minWidth'] = 80;
      arg.element['minHeight'] = 70;
    }
    diagramsLogicData[elementId]['id'] = elementId;
    diagramsLogicData[elementId]['label'] =
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

    this.saveDiagram(diagram, isActiveStage);
  }

  public handleContextMenuClick(
    args: MenuEventArgs,
    diagram: Diagram,
    selectedNode: NodeModel,
    elementData: any
  ): void {
    this.stageElement = selectedNode.addInfo?.['stage'] ?? '';
    console.log(args.item.id );
    if (
      args.item.id === 'InsertLaneBefore' ||
      args.item.id === 'InsertLaneAfter'
    ) {
      if (
        diagram.selectedItems.nodes.length > 0 &&
        (diagram.selectedItems.nodes[0] as NodeModel)['isLane']
      ) {
        let index: number;
        const node = diagram.selectedItems.nodes[0] as NodeModel;
        const swimlane: NodeModel = diagram.getObject((node as any).parentId);
        const shape: SwimLaneModel = swimlane.shape as SwimLaneModel;
        const existingLane: LaneModel = cloneObject(shape.lanes[0]);

        const newLane: LaneModel = {
          id: randomId(),
          header: {
            width: existingLane.header.width,
            height: existingLane.header.height,
            style: existingLane.header.style,
          },
          style: existingLane.style,
          height: existingLane.height,
          width: existingLane.width,
        };

        if (shape.orientation === 'Horizontal') {
          const exclude =
            (shape.header ? 1 : 0) + (shape.phases.length ? 1 : 0);
          index = (node as any).rowIndex - exclude;
        } else {
          index = (node as any).columnIndex - (shape.phases.length ? 1 : 0);
        }

        if (args.item.id === 'InsertLaneBefore') {
          diagram.addLanes(swimlane, [newLane], index);
        } else {
          diagram.addLanes(swimlane, [newLane], index + 1);
        }
        diagram.clearSelection();
      }
    } else if (args.item.id === 'Clone') {
      diagram.copy();
    } else if (args.item.id === 'Settings') {
      this.matDialog.closeAll();
      this.onOpenDialog(elementData);
    } else if (
      selectedNode &&
      args.item.id !== 'fill' &&
      args.item.id !== 'annotationText'
    ) {
      this.handleNodeStyleChange(args, selectedNode, diagram);
    } else if (args.item.id === 'Collapse'){
      const nodeId = selectedNode.id;
      const laneId = selectedNode.shape?.['lanes'][0]?.id;
      const isCollapsed = selectedNode.shape?.['lanes'][0]?.height === 30;
  
      this.toggleSwimlaneHeight(diagram, nodeId, laneId, isCollapsed);
    }
  }

  public toggleSwimlaneHeight(diagram, nodeId: string, laneId: string, isCollapsed: boolean): void {
    console.log(diagram, nodeId, laneId,isCollapsed)
    const node = diagram.getObject(nodeId) as NodeModel;
    if (node) {
      const lane = node.shape?.['lanes'].find(l => l.id === laneId);
      if (lane) {
        if (isCollapsed) {
          lane.height = 30; // Уменьшаем высоту для "свернутого" состояния
        } else {
          lane.height = 100; // Восстанавливаем высоту для "развернутого" состояния
        }
        diagram.dataBind(); // Обновляем диаграмму
      }
    }
  }

  private handleNodeStyleChange(
    args: MenuEventArgs,
    selectedNode: NodeModel,
    diagram: Diagram
  ): void {
    if (['Red', 'Blue', 'Yellow', 'Green'].includes(args.item.text)) {
      selectedNode.style.fill = args.item.text;
      (diagram as any)?.dataBind();
    } else if (
      ['Standard', 'Emergency', 'Planned', 'Unscheduled'].includes(
        args.item.text
      )
    ) {
      selectedNode.annotations[0].content = args.item.text;
      (diagram as any)?.dataBind();
    }
    (diagram as any)?.dataBind();
  }

  private onOpenDialog(elementData): void {
    const dialogRef = this.matDialog.open(SettingsDialogComponent, {
      width: '260px',
      data: {
        element: elementData,
        stage: this.stageElement,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        elementData = result;
      }
    });
  }
}

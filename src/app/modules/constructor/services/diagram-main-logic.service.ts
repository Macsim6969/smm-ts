import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  cloneObject,
  Diagram,
  DiagramComponent,
  IDragEnterEventArgs,
  LaneModel,
  NodeConstraints,
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
          `https://smm-st-19042-default-rtdb.firebaseio.com/test/${diagramId}.json`,
          JSON.stringify(this.saveData)
        )
        .subscribe();
    });
  }

  public getDiagramDataFromBack(diagramId: string) {
    return this.httpClient.get(
      `https://smm-st-19042-default-rtdb.firebaseio.com/test/${diagramId}.json`
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
    arg.element['properties'].style.properties.strokeWidth = 0
    console.log(arg.element['properties'].style.properties)
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
      arg.element['properties'].addInfo.stage === 'Electronic_signature' ||
      arg.element['properties'].addInfo.stage === 'Communication' ||
      arg.element['properties'].addInfo.stage === 'Integration'
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
    } else if (args.item.id == 'Collapse') {
      const node = selectedNode.id;
      this.toggleSwimlaneWidth(diagram, node);
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
    }
  }

  public toggleSwimlaneWidth(diagram: Diagram, nodeId: string): void {
    const swimlane = diagram.getObject(nodeId) as NodeModel;
  
    if (swimlane) {
      // Инициализация addInfo, если еще не существует
      if (!swimlane.addInfo) {
        swimlane.addInfo = {};
      }
  
      // Проверяем текущий статус сворачивания
      const isCollapsed = swimlane.addInfo['isCollapsed'] || false;
  
      // Храним оригинальную ширину, если еще не сохранена
      if (!swimlane.addInfo['originalWidth']) {
        swimlane.addInfo['originalWidth'] = swimlane.width;
      }
  
      // 1. Сначала меняем ширину swimlane
      if (!isCollapsed) {
        swimlane.width = swimlane.addInfo['originalWidth']; // Восстановить оригинальную ширину
        swimlane['actualSize'].width = swimlane.addInfo['originalWidth'];
        swimlane['properties']['width'] = swimlane.addInfo['originalWidth'];
      } else {
        swimlane.width = 50; // Сжать swimlane
        swimlane['actualSize'].width = 50;
        swimlane['properties']['width'] = 50;
      }

      console.log(swimlane);
  
      // 2. Меняем видимость дочерних элементов сразу
      swimlane.children?.forEach((childId) => {
        const childNode = diagram.getObject(childId) as NodeModel;
        if (childNode) {
          childNode.visible = !isCollapsed; // Скрыть/показать в зависимости от состояния
        }
      });
  
      // 3. Меняем видимость соединений, если они привязаны к дочерним элементам
      diagram.connectors.forEach((connector) => {
        const sourceNode = diagram.getObject(connector.sourceID) as NodeModel;
        const targetNode = diagram.getObject(connector.targetID) as NodeModel;
  
        // Если источник или цель соединения - дочерний элемент swimlane, скрываем соединение
        if (
          swimlane.children?.includes(sourceNode?.id) ||
          swimlane.children?.includes(targetNode?.id)
        ) {
          connector.visible = !isCollapsed; // Скрыть соединение
        }
      });
  
      // 4. Обновляем информацию о статусе сворачивания
      swimlane.addInfo['isCollapsed'] = !isCollapsed;
  
      // 5. Применяем изменения к диаграмме
      diagram.dataBind();
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

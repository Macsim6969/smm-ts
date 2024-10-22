import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  Query,
} from '@angular/core';
import {
  ConnectorModel,
  ContextMenuSettingsModel,
  DataBinding,
  DataSourceModel,
  DecoratorModel,
  Diagram,
  DiagramComponent,
  HierarchicalTree,
  LayoutModel,
  NodeModel,
  PaletteModel,
  ShapeStyleModel,
  SnapSettingsModel,
} from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ExpandMode } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorComponent {
  public expandMode?: ExpandMode;
  public palettes?: PaletteModel[];
  public getBasicShapes(): NodeModel[] {
    let basicShapes: NodeModel[] = [
      {
        id: 'Rectangle',
        shape: {
          type: 'Basic',
          shape: 'Rectangle',
        },
      },
      {
        id: 'Ellipse',
        shape: {
          type: 'Basic',
          shape: 'Ellipse',
        },
      },
      {
        id: 'Hexagon',
        shape: {
          type: 'Basic',
          shape: 'Hexagon',
        },
      },
    ];
    return basicShapes;
  }
  public getFlowShapes(): NodeModel[] {
    let flowShapes: NodeModel[] = [
      {
        id: 'process',
        shape: {
          type: 'Flow',
          shape: 'Process',
        },
      },
      {
        id: 'document',
        shape: {
          type: 'Flow',
          shape: 'Document',
        },
      },
      {
        id: 'predefinedprocess',
        shape: {
          type: 'Flow',
          shape: 'PreDefinedProcess',
        },
      },
    ];
    return flowShapes;
  }
  public getConnectors(): ConnectorModel[] {
    let connectorSymbols: ConnectorModel[] = [
      {
        id: 'Link1',
        type: 'Orthogonal',
        sourcePoint: {
          x: 0,
          y: 0,
        },
        targetPoint: {
          x: 40,
          y: 40,
        },
        targetDecorator: {
          shape: 'Arrow',
        },
      },
      {
        id: 'Link21',
        type: 'Straight',
        sourcePoint: {
          x: 0,
          y: 0,
        },
        targetPoint: {
          x: 40,
          y: 40,
        },
        targetDecorator: {
          shape: 'Arrow',
        },
      },
      {
        id: 'link33',
        type: 'Bezier',
        sourcePoint: {
          x: 0,
          y: 0,
        },
        targetPoint: {
          x: 40,
          y: 40,
        },
        style: {
          strokeWidth: 2,
        },
        targetDecorator: {
          shape: 'None',
        },
      },
    ];
    return connectorSymbols;
  }

  public nodes: NodeModel[] = [
    {
        shape: {
            type: 'SwimLane',
            lanes: [
                {
                    id: 'stackCanvas1',
                    height: 100,
                },
            ],
            phases: [{
                id: 'phase1', offset: 170,
                    header: { annotation: { content: 'Phase' } }
            }
            ],
            phaseSize: 20,
        },
        offsetX: 300, offsetY: 200,
         height: 200,
         width: 350
    },
  ]
@ViewChild("diagram")
public diagram?: DiagramComponent;  
  ngOnInit(): void {
    this.expandMode = 'Multiple';
    this.palettes = [
      {
        //Sets the id of the palette
        id: 'flow',
        //Sets whether the palette expands/collapse its children
        expanded: true,
        //Adds the palette items to palette
        symbols: this.getFlowShapes(),
        //Sets the header text of the palette
        title: 'Flow Shapes',
        iconCss: 'e-ddb-icons e-flow',
      },
      {
        id: 'basic',
        expanded: true,
        symbols: this.getBasicShapes(),
        title: 'Basic Shapes',
        iconCss: 'e-ddb-icons e-basic',
      },
      {
        id: 'connectors',
        expanded: true,
        symbols: this.getConnectors(),
        title: 'Connectors',
        iconCss: 'e-ddb-icons e-connector',
      },
    ];
  }
}

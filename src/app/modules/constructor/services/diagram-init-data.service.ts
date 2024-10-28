import { Injectable } from "@angular/core";
import { ContextMenuSettingsModel, PaletteModel, PointPortModel, PortConstraints, PortVisibility } from "@syncfusion/ej2-angular-diagrams";

@Injectable()

export class DiagramInitDataService{

  private readonly port: PointPortModel[] = [
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

  private readonly palettes: PaletteModel[] = [
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
          width: 90,
          height: 80,
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
          width: 80,
          height: 90,
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
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
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
          width: 90,
          height: 90,
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
          width: 90,
          height: 90,
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
          width: 90,
          height: 90,
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
                height: 200,
                width: 450,
                header: { width: 80, height: 80, style: { fontSize: 16 } },
              },
            ],
            orientation: 'Horizontal',
            isLane: true,
          },
          height: 150,
          width: 300,
          offsetX: 120,
          offsetY: 120,
        },
        {
          id: 'Verticalswimlane',
          addInfo: { tooltip: 'Vertical swimlane' },
          shape: {
            type: 'SwimLane',
            lanes: [
              {
                id: 'lane1',
                height: 200,
                width: 450,
                header: { width: 80, height: 80, style: { fontSize: 16 } },
              },
            ],
            orientation: 'Vertical',
            isLane: true,
          },
          height: 150,
          width: 300,
          offsetX: 120,
          offsetY: 120,
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


  private readonly contextMenuSettings: ContextMenuSettingsModel = {
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
      {
        text: 'Fill',
        items: [
          { id: 'red', text: 'Red' },
          { id: 'yellow', text: 'Yellow' },
          { id: 'green', text: 'Green' },
          { id: 'blue', text: 'Blue' },
        ],
        id: 'fill',
        target: '.e-elementcontent',
        iconCss: 'e-icons e-paint-bucket',
      },
      {
        text: 'Annotation Text',
        id: 'annotationText',
        items: [
          { id: 'standard', text: 'Standard' },
          { id: 'emergency', text: 'Emergency' },
          { id: 'planned', text: 'Planned' },
          { id: 'unscheduled', text: 'Unscheduled' },
        ],
        target: '.e-elementcontent',
        iconCss: 'e-icons e-font-color',
      }
    ],
    showCustomMenuOnly: true,
  };



  get _portSettings(): PointPortModel[]{
    return this.port;
  }

  get _palettesData(): PaletteModel[]{
    return this.palettes;
  }

  get _contextMenuSettings(): ContextMenuSettingsModel{
    return this.contextMenuSettings;
  }
}
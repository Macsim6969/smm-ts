import { Injectable } from '@angular/core';
import {
  ContextMenuSettingsModel,
  PaletteModel,
  PointPortModel,
  PortConstraints,
  PortVisibility,
  UserHandleModel,
} from '@syncfusion/ej2-angular-diagrams';
import { DiagramStoreIconsService } from './diagram-store-icons.service';

@Injectable()
export class DiagramInitDataService {

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
      id: 'Applications',
      expanded: true,
      title: 'Заявки', 
      symbols: [
        {
          id: 'Standard',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD'
          },
          annotations: [
            {
              content: 'Стандартн.',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Стандартная', stage: 'Applications' }, // Название этапа
        },
        {
          id: 'Emergency',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD'
          },
          annotations: [
            {
              content: 'Аварийная',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Аварийная', stage: 'Applications' },
        },
        {
          id: 'Planned',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD'
          },
          annotations: [
            {
              content: 'Плановая',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Плановая', stage: 'Applications' },
        },
        {
          id: 'unscheduled',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD'
          },
          annotations: [
            {
              content: 'Внепланов.',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Внеплановая', stage: 'Applications' },
        },
      ],
    },
    {
      id: 'RFX_Tender',
      expanded: true,
      title: 'Тендер RFX',
      symbols: [
        {
          id: 'Qual_RFQ',
          width: 150,
          height: 75,
          addInfo: { tooltip: 'Квалифик. RFQ', stage: 'RFX_Tender' },
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Квалифик. RFQ',
              style: { color: 'black', fontSize: 18 },
            },
          ],
        },
        {
          id: 'Price_monitoring',
          width: 150,
          height: 75,
          addInfo: { tooltip: 'Мониторинг цен', stage: 'RFX_Tender' },
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Мониторинг цен',
              style: { color: 'black', fontSize: 18 },
            },
          ],
        },
        {
          id: 'Request for technical',
          width: 150,
          height: 75,
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Запрос техническ...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Запрос техническ...', stage: 'RFX_Tender' },
        },
        {
          id: 'Re-auction from the list',
          width: 150,
          height: 75,
          shape: {
            type: 'UmlActivity',
            classifier: 'Class',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Переторжка из списка... ',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Переторжка из списка... .', stage: 'RFX_Tender' },
        },
      ],
    },
    {
      id: 'Set_of_conditions',
      expanded: true,
      title: 'Набор условий',
      symbols: [
        {
          id: 'Sum range',
          addInfo: { tooltip: 'Диапазон суммы', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Диапазон сумм',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Category',
          addInfo: { tooltip: 'Категория', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Категория',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'SKU',
          addInfo: { tooltip: 'SKU', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'SKU',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Application type',
          addInfo: { tooltip: 'Тип заявки', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Тип заявки',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Type of purchase',
          addInfo: { tooltip: 'Тип закупки', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Тип закупки',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Contract type',
          addInfo: { tooltip: 'Тип договора', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Тип договора',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Type of acceptance',
          addInfo: { tooltip: 'Тип приемки', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Тип приемки',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },

        {
          id: 'Date',
          addInfo: { tooltip: 'Дата', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Дата',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Time',
          addInfo: { tooltip: 'Время', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Время',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Day of the week',
          addInfo: { tooltip: 'День недели', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'День недели',
              style: { color: 'black', fontSize: 14 },
            },
          ],
        },
        {
          id: 'Month',
          addInfo: { tooltip: 'Месяц', stage: 'Trigger' },
          width: 100,
          height: 100,
          shape: { type: 'Flow', shape: 'Decision' },
          ports: this.port,
          style: {
            fill: '#FF8D23',
          },
          annotations: [
            {
              content: 'Месяц',
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
          addInfo: { tooltip: 'Horizontal swimlane', stage: 'Test' },
          shape: {
            header: { width: 0, height: 0 },
            type: 'SwimLane',
            lanes: [
              {
                id: 'lane1',
                height: 600,
                width: 500,
                header: { width: 80, height: 80, style: { fontSize: 16 } }
              },
            ],
            phaseSize: 0,
            orientation: 'Horizontal',
            isLane: true,
          },
          height: 600,
          width: 500,
          offsetX: 0,
          offsetY: 0,
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
      id: 'Counterparty_verification',
      expanded: true,
      title: 'Проверка контрагента',
      symbols: [
        {
          id: 'Youcontrol',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Youcontrol'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Counterparty_verification',
          },
        },
        {
          id: 'Open bot',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Open_bot'),
          },
          ports: this.port,
          addInfo: { stage: 'Counterparty_verification' },
        },
        {
          id: 'Гос. реестры',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('State_register'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Counterparty_verification',
          },
        },
      ],
    },
    {
      id: 'Electronic_signature',
      expanded: true,
      title: 'Электронная подпись',
      symbols: [
        {
          id: 'Dia',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Dia'),
          },
          ports: this.port,
          addInfo: { stage: 'Electronic_signature' },
        },
        {
          id: 'In Time',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('In_Time'),
          },
          ports: this.port,
          addInfo: { stage: 'Electronic_signature' },
        },
        {
          id: 'Kay',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Kay'),
          },
          ports: this.port,
          addInfo: { stage: 'Electronic_signature' },
        },
        {
          id: 'Flash Drive',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Flash_drive'),
          },
          ports: this.port,
          addInfo: {  stage: 'Electronic_signature' },
        },
      ],
    }
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
        text: 'Collapse',
        id: 'Collapse',
        target: '.e-diagramcollapse'
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
          { id: 'application_type', text: 'Application type' },
          { id: 'range_of_sum', text: 'Range of sum' },
          { id: 'category', text: 'Category' },
        ],
        target: '.e-elementcontent',
        iconCss: 'e-icons e-font-color',
      },
    ],
    showCustomMenuOnly: true,
  };

  private readonly handlesData: UserHandleModel[] = [
    {
      name: 'Clone',
      pathData:
        'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
      tooltip: { content: 'Clone' },
      visible: true,
      offset: 1,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
      name: 'Delete',
      pathData:
        'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
      tooltip: { content: 'Delete' },
      visible: true,
      offset: 0,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  ];

  get _portSettings(): PointPortModel[] {
    return this.port;
  }

  get _palettesData(): PaletteModel[] {
    return this.palettes;
  }

  get _contextMenuSettings(): ContextMenuSettingsModel {
    return this.contextMenuSettings;
  }

  get _handlesData(): UserHandleModel[] {
    return this.handlesData;
  }

  constructor(private diagramStoreIconsService: DiagramStoreIconsService) {}
}

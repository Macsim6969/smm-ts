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
      id: 'Ready-made-processes',
      expanded: true,
      title: 'Готовые процессы',
      symbols: [
        {
          id: 'Retail',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Ритейл',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Ритейл', stage: 'Ready-made-processes' }, // Название этапа
        },
        {
          id: 'Agorosek',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Агоросек...',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Агоросек...', stage: 'Ready-made-processes' }, // Название этапа
        },
        {
          id: 'Big',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Большой',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Большой', stage: 'Ready-made-processes' },
        },
        {
          id: 'Banks',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Банки',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Банки', stage: 'Ready-made-processes' },
        },
        {
          id: 'Machine_building',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Маш. строение',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Маш. строение', stage: 'Ready-made-processes' },
        },
        {
          id: 'Food_industry',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Пищевая промышл...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Пищевая промышл...', stage: 'Ready-made-processes' },
        }
      ],
    },
    {
      id: 'Purchase',
      expanded: true,
      title: 'Закупка',
      symbols: [
        {
          id: 'Raw_materials_indirect',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Сырьевые (непрямые)',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Сырьевые (непрямые)', stage: 'Purchase' }, // Название этапа
        },
        {
          id: 'Operational_indirect',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Операционные (непрямые)',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Операционные (непрямые)', stage: 'Purchase' }, // Название этапа
        },
        {
          id: 'Complex_procurement',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Сложная закупка',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Сложная закупка', stage: 'Purchase' },
        },
        {
          id: 'Simple_purchase',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Простая закупка',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Простая закупка', stage: 'Purchase' },
        },
        {
          id: 'Simplified_tender',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Упрощенный  тендер',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Упрощенный  тендер', stage: 'Purchase' },
        },
        {
          id: 'Non-tender_procurement',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Безтендерная закупка',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Безтендерная закупка', stage: 'Purchase' },
        },
        {
          id: 'Non-tender_procurement',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Безтендерная закупка',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Безтендерная закупка', stage: 'Purchase' },
        },
        {
          id: 'Reduction',
          width: 140,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Reduction'),
          },
          ports: this.port,
          addInfo: { stage: 'Purchase' },
        },
        {
          id: 'Tender_Request_Quotations',
          width: 140,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Tender_Request_Quotations'),
          },
          ports: this.port,
          addInfo: { stage: 'Purchase' },
        },
        {
          id: 'Reduction_present_price',
          width: 140,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Reduction_present_price'),
          },
          ports: this.port,
          addInfo: { stage: 'Purchase' },
        },
        {
          id: 'From_accredited',
          width: 140,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('From_accredited'),
          },
          ports: this.port,
          addInfo: { stage: 'Purchase' },
        },
      ],
    },
    {
      id: 'Applications',
      expanded: true,
      title: 'Заявки',
      symbols: [
        {
          id: 'Purchase_Request',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Заявка на покупку',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Заявка на покупку', stage: 'Applications' }, // Название этапа
        },
        {
          id: 'Standard',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
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

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
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

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
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
          id: 'Unscheduled',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Внеплановая',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Внеплановая', stage: 'Applications' },
        },       
        {
          id: 'Emergency Drive',
          width: 120,
          height: 60,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Emergency'),
          },
          ports: this.port,
          addInfo: { stage: 'Applications' },
        }
      ],
    },
    {
      id: 'Non-tender_procedures',
      expanded: true,
      title: 'Безтендерные процедуры',
      symbols: [
        {
          id: 'Purchasing_from_one_source',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Закупка у одного ист...',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Закупка у одного ист...', stage: 'Non-tender_procedures' }, // Название этапа
        },
        {
          id: 'By_the_score',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'По счету',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'По счету', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Emergency_purchase',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Аварийная закупка',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Аварийная закупка', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Credits_supplier',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Акредитов. поставщик ',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Акредитов. поставщик ', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Purchase_registration',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Регистрац.  закупки',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Регистрац.  закупки', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Competitor_negotiations',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Конкурент. переговоры',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Конкурент. переговоры', stage: 'Non-tender_procedures' },
        },
        {
          id: 'From_the_list_of_selected',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Из списка отобранн... ',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Из списка отобранн... ', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Regulations_exceptions',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Регламент... исключения',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Регламент... исключения', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Solution_TOP_me',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Решение ТОП мен...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Решение ТОП мен...', stage: 'Non-tender_procedures' },
        },
        {
          id: 'Decision_watched',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Решение наблюдат... ',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Решение наблюдат... ', stage: 'Non-tender_procedures' },
        }
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

          addInfo: {
            tooltip: 'Переторжка из списка... .',
            stage: 'RFX_Tender',
          },
        },
      ],
    },
    {
      id: 'Online_bidding',
      expanded: true,
      title: 'Онлайн торги',
      symbols: [
        {
          id: 'Bidding_on_price_only',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Торги только по цене ',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Торги только по цене ', stage: 'Online_bidding' }, // Название этапа
        },
        {
          id: 'Bidding_complex',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Торги по комплексн...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Торги по комплексн...', stage: 'Online_bidding' },
        },
        {
          id: 'Trading_given',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Торги по приведен...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Торги по приведен...', stage: 'Online_bidding' },
        },
        {
          id: 'Bidding_complex',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Торги по комплекс...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Торги по комплекс...', stage: 'Online_bidding' },
        },
        {
          id: 'Trading_on',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Одноврем. торги по ...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Одноврем. торги по ...', stage: 'Online_bidding' },
        }
      ],
    },
    {
      id: 'Agreements',
      expanded: true,
      title: 'Договора',
      symbols: [
        {
          id: 'Standard_Agreement',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Стандарт...',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Стандарт...', stage: 'Agreements' }, // Название этапа
        },
        {
          id: 'Supplier',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Поставщ...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Поставщ...', stage: 'Agreements' },
        },
        {
          id: 'Template_by_category',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Шаблон по категориям',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Шаблон по категориям', stage: 'Agreements' },
        },
        {
          id: 'Template_by_SUK',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Шаблон по SUK',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Шаблон по SUK', stage: 'Agreements' },
        },
        {
          id: 'AI_Contract_Creation',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Создание договора',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Создание договора', stage: 'Agreements' },
        },
        {
          id: 'AI_Contract_Check',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Проверка договора',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Проверка договора', stage: 'Agreements' },
        }
      ]
    },
    {
      id: 'AI_Neolink',
      expanded: true,
      title: 'AI Neolink',
      iconCss: 'logo',
      symbols: [
        {
          id: 'AI_Price_Monitor',
          width: 150,
          height: 80,
          shape: {
            type: 'UmlActivity',  
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Монитор. цен',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Монитор. цен', stage: 'AI_Neolink' },
        },
        {
          id: 'AI_Checking_technical_specifications',
          width: 150,
          height: 80,
          shape: {
            type: 'UmlActivity',  
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Проверка тех. задания',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Проверка тех. задания', stage: 'AI_Neolink' },
        },
        {
          id: 'AI_Communic',
          width: 150,
          height: 80,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Коммуник.',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Коммуник.', stage: 'AI_Neolink' },
        },
        {
          id: 'AI_Search_Supplier',
          width: 150,
          height: 80,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Поиск поставщик.',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Поиск поставщик.', stage: 'AI_Neolink' },
        }
      ]
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
      id: 'Set_control',
      expanded: true,
      title: 'Набор контролей',
      symbols: [
        {
          id: 'External_expert',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Внешний эксперт',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Внешний эксперт', stage: 'Set_control' }, // Название этапа
        },
        {
          id: 'Internal_expert',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Внутренний эксперт',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Внутренний эксперт', stage: 'Set_control' },
        },
        {
          id: 'Technical_expertise',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Техническая экспертиза',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Техническая экспертиза', stage: 'Set_control' },
        },
        {
          id: 'Food_expert',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Эксперт по пищевым...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Эксперт по пищевым...', stage: 'Set_control' },
        },
        {
          id: 'AI_Price_Monitor',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Монитор. цен',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Монитор. цен', stage: 'Set_control' },
        },
        {
          id: 'AI_Checking_technical_specifications',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#FFD382',
          },
          annotations: [
            {
              content: 'AI Проверка тех. задания',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'AI Проверка тех. задания', stage: 'Set_control' },
        },
        {
          id: 'Audit',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Аудит',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Аудит', stage: 'Set_control' },
        },
        {
          id: 'Nab_Council',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Наб совет',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Наб совет', stage: 'Set_control' },
        },
        {
          id: 'Security_service',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Служба безопасн.',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Служба безопасн.', stage: 'Set_control' },
        },
        {
          id: 'General_Director',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Ген. директор',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Ген. директор', stage: 'Set_control' },
        }
      ]
    },
    // {
    //   id: 'swimlaneShapes',
    //   expanded: true,
    //   title: 'Swimlane Shapes',
    //   symbols: [
    //     {
    //       id: 'Horizontalswimlane',
    //       addInfo: { tooltip: 'Horizontal swimlane', stage: 'Test' },
    //       shape: {
    //         header: { width: 0, height: 0 },
    //         type: 'SwimLane',
    //         lanes: [
    //           {
    //             id: 'lane1',
    //             height: 600,
    //             width: 500,
    //             header: { width: 80, height: 80, style: { fontSize: 16 } },
    //           },
    //         ],
    //         phaseSize: 0,
    //         orientation: 'Horizontal',
    //         isLane: true,
    //       },
    //       height: 600,
    //       width: 500,
    //       offsetX: 0,
    //       offsetY: 0,
    //     },
    //     {
    //       id: 'Verticalswimlane',
    //       addInfo: { tooltip: 'Vertical swimlane' },
    //       shape: {
    //         type: 'SwimLane',
    //         lanes: [
    //           {
    //             id: 'lane1',
    //             height: 200,
    //             width: 450,
    //             header: { width: 80, height: 80, style: { fontSize: 16 } },
    //           },
    //         ],
    //         orientation: 'Vertical',
    //         isLane: true,
    //       },
    //       height: 150,
    //       width: 300,
    //       offsetX: 120,
    //       offsetY: 120,
    //     },
    //     {
    //       id: 'Verticalphase',
    //       addInfo: { tooltip: 'Vertical phase' },
    //       shape: {
    //         type: 'SwimLane',
    //         phases: [{ style: { strokeDashArray: '3,3' } }],
    //         annotations: [{ text: '' }],
    //         orientation: 'Vertical',
    //         isPhase: true,
    //       },
    //       height: 60,
    //       width: 140,
    //     },
    //     {
    //       id: 'Horizontalphase',
    //       addInfo: { tooltip: 'Horizontal phase' },
    //       shape: {
    //         type: 'SwimLane',
    //         phases: [{ style: { strokeDashArray: '3,3' } }],
    //         annotations: [{ text: '' }],
    //         orientation: 'Horizontal',
    //         isPhase: true,
    //       },
    //       height: 60,
    //       width: 140,
    //     },
    //   ],
    // },
    {
      id: 'Communication',
      expanded: true,
      title: 'Коммуникация',
      symbols: [
        {
          id: 'Email',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Email'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Communication',
          },
        },
        {
          id: 'Phone',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('Phone'),
          },
          ports: this.port,
          addInfo: { stage: 'Communication' },
        },
        {
          id: 'Messanger',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Messanger'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Communication',
          },
        },
        {
          id: 'Notification',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Notification'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Communication',
          },
        },  
        {
          id: 'AI_comm',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('AI_comm'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Communication',
          },
        }
      ]
    },
    {
      id: 'Coordination',
      expanded: true,
      title: 'Согласование',
      symbols: [
        {
          id: 'Agreed_one_of_all',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Согласов. один из всех',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Согласов. один из всех', stage: 'Coordination' }, // Название этапа
        },
        {
          id: 'Agreed_by_everyone',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Согласов. каждый',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Согласов. каждый', stage: 'Coordination' }, // Название этапа
        },
        {
          id: 'Vote',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Голосование',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Голосование', stage: 'Coordination' },
        } 
      ]
    },
    {
      id: 'Special_processes',
      expanded: true,
      title: 'Спец процессы',
      symbols: [
        {
          id: 'Testing_laboratory',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Тестиров. лаборатория',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Тестиров. лаборатория', stage: 'Special_processes' }, // Название этапа
        },
        {
          id: 'Testing_technology',
          width: 150,
          height: 60,
          shape: {
            type: 'UmlActivity',

            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Тестиров. технология',
              style: { color: 'black', fontSize: 18 },
            },
          ],
          addInfo: { tooltip: 'Тестиров. технология', stage: 'Special_processes' }, // Название этапа
        },
        {
          id: 'Experimental_form',
          width: 150,
          height: 50,
          shape: {
            type: 'UmlActivity',
            cornerRadius: 16,
          },
          ports: this.port,
          style: {
            fill: '#DFD8FD',
          },
          annotations: [
            {
              content: 'Бланк эксперим...',
              style: { color: 'black', fontSize: 18 },
            },
          ],

          addInfo: { tooltip: 'Бланк эксперим...', stage: 'Special_processes' },
        } 
      ]
    },
    {
      id: 'Integration',
      expanded: true,
      title: 'Интеграция',
      symbols: [
        {
          id: '1C',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('1C'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Integration',
          },
        },
        {
          id: 'SAP',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content: this.diagramStoreIconsService.getNativeContent('SAP'),
          },
          ports: this.port,
          addInfo: { stage: 'Integration' },
        },
        {
          id: 'MS_Dinamics',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('MS_Dinamics'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Integration',
          },
        },
        {
          id: 'Oracle',
          width: 100,
          height: 80,
          shape: {
            type: 'Native',
            content:
              this.diagramStoreIconsService.getNativeContent('Oracle'),
          },
          ports: this.port,
          addInfo: {
            stage: 'Integration',
          },
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
          width: 110,
          height: 100,
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
          addInfo: { stage: 'Electronic_signature' },
        },
      ],
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
        target: '.e-diagramcollapse',
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

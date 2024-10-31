import { ExpandMode } from '@syncfusion/ej2-navigations';
import { Component, ViewChild } from '@angular/core';
import { Connector, ConnectorModel, DiagramComponent, DiagramTools, GridlinesModel, IDragEnterEventArgs, MarginModel, NodeModel, PaletteModel, RulerSettingsModel, SnapSettingsModel, SymbolInfo, UmlClassifierShapeModel } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-constructor-test',
  templateUrl: './constructor-test.component.html',
  styleUrl: './constructor-test.component.scss'
})
export class ConstructorTestComponent {

  @ViewChild('diagram')
  public diagram: DiagramComponent;
  public rulerSettings: RulerSettingsModel = { showRulers: true, dynamicGrid: true }
  public continuousDraw: boolean = true;
  private interval: number[] = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
  private horizontalGridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: this.interval };
  private verticalGridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: this.interval };
  public snapSettings: SnapSettingsModel = {snapObjectDistance: 5, horizontalGridlines: this.horizontalGridlines, verticalGridlines: this.verticalGridlines};

  ngOnInit(): void {
  // Attach click event handler
      document.getElementById('appearance').onclick = this.documentClick.bind(this);
  }

  // custom code start
  public getNativeContent(): string {
      let str: any = '<svg width="70" height="57" viewBox="0 0 70 57" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="69.6667" height="57" rx="8" fill="#EFF2F8"/> <g clip-path="url(#clip0_4474_24270)"> <mask id="mask0_4474_24270" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="22" y="8" width="25" height="24"> <path d="M34.8333 32C40.0915 32 43.015 32 44.9241 30.0908C46.8333 28.1816 46.8333 25.2602 46.8333 20C46.8333 14.7398 46.8333 11.8184 44.9241 9.90919C43.015 8 40.0915 8 34.8333 8C29.5748 8 26.6516 8 24.7425 9.90919C22.8333 11.8184 22.8333 14.7416 22.8333 20C22.8333 25.2584 22.8333 28.1816 24.7425 30.0908C26.6516 32 29.5748 32 34.8333 32Z" fill="url(#paint0_linear_4474_24270)"/> </mask> <g mask="url(#mask0_4474_24270)"> <path d="M47.0719 7.77277H22.6106V32.2341H47.0719V7.77277Z" fill="black"/> </g> <path d="M39.34 17.6273C38.4333 17.6273 37.7605 18.3271 37.7605 19.1905C37.7605 19.8955 38.2563 20.4456 38.884 20.6084L37.5974 22.5789H38.7989L39.8928 20.745H40.7114V22.5789H41.7145V17.6273H39.34ZM39.478 19.9073C39.0655 19.9073 38.8098 19.5835 38.8098 19.2144C38.8098 18.8454 39.0442 18.4938 39.478 18.4938H40.7125V19.9073H39.478Z" fill="white"/> <path d="M33.8462 17.6273L33.5132 18.5438L34.8793 18.536L34.0704 21.5031C33.8398 22.3683 34.7413 23.022 35.5108 22.5132L37.2609 21.326L36.7457 20.5688L34.9978 21.7795L36.1757 17.6273H33.8462Z" fill="white"/> <path d="M35.731 16.9906C36.1142 16.9906 36.4251 16.7106 36.4251 16.3653C36.4251 16.0199 36.1142 15.7399 35.731 15.7399C35.3477 15.7399 35.0369 16.0199 35.0369 16.3653C35.0369 16.7106 35.3477 16.9906 35.731 16.9906Z" fill="white"/> <path d="M32.1899 21.665V16.4767H28.3407V19.2458C28.3407 20.5488 27.9634 21.3543 27.741 21.6629H27.2849V23.9259H28.261V22.5881H31.9105V23.928H32.8862V21.665H32.1899ZM29.3111 19.1888V17.3971H31.189V21.662H28.765C28.9848 21.3025 29.3111 20.3877 29.3111 19.1888Z" fill="white"/> </g> <path d="M27.3399 46.7614V44.2188H27.8087C27.9696 44.072 28.1212 43.8648 28.2632 43.5973C28.4076 43.3274 28.5295 42.9676 28.629 42.5178C28.7308 42.0656 28.7982 41.4915 28.8314 40.7955L28.9876 37.7273H33.3058V44.2188H34.1439V46.7472H33.3058V45H28.178V46.7614H27.3399ZM28.8598 44.2188H32.4678V38.5085H29.7831L29.6695 40.7955C29.641 41.3258 29.5913 41.8063 29.5203 42.2372C29.4493 42.6657 29.3581 43.0457 29.2469 43.3771C29.1356 43.7062 29.0066 43.9867 28.8598 44.2188ZM35.361 45V39.5455H36.1991V45H35.361ZM35.7872 38.6364C35.6238 38.6364 35.483 38.5807 35.3646 38.4695C35.2486 38.3582 35.1906 38.2244 35.1906 38.0682C35.1906 37.9119 35.2486 37.7782 35.3646 37.6669C35.483 37.5556 35.6238 37.5 35.7872 37.5C35.9505 37.5 36.0902 37.5556 36.2062 37.6669C36.3246 37.7782 36.3838 37.9119 36.3838 38.0682C36.3838 38.2244 36.3246 38.3582 36.2062 38.4695C36.0902 38.5807 35.9505 38.6364 35.7872 38.6364ZM41.0153 45V40.3125H39.5665C39.2398 40.3125 38.9829 40.3883 38.7959 40.5398C38.6088 40.6913 38.5153 40.8996 38.5153 41.1648C38.5153 41.4252 38.5994 41.63 38.7675 41.7791C38.9379 41.9283 39.1711 42.0028 39.467 42.0028H41.2284V42.7841H39.467C39.0977 42.7841 38.7793 42.719 38.5118 42.5888C38.2443 42.4586 38.0383 42.2727 37.8939 42.0312C37.7495 41.7874 37.6773 41.4986 37.6773 41.1648C37.6773 40.8286 37.753 40.5398 37.9045 40.2983C38.0561 40.0568 38.2727 39.871 38.5544 39.7408C38.8385 39.6106 39.1758 39.5455 39.5665 39.5455H41.8108V45H41.0153ZM37.379 45L38.9273 42.2869H39.8364L38.2881 45H37.379Z" fill="#101828"/> <defs> <linearGradient id="paint0_linear_4474_24270" x1="22.8333" y1="15.3483" x2="46.8333" y2="15.3483" gradientUnits="userSpaceOnUse"> <stop stop-color="#13C7FF"/> <stop offset="1" stop-color="#FFFF36"/> </linearGradient> <clipPath id="clip0_4474_24270"> <rect width="24" height="24" fill="white" transform="translate(22.8333 8)"/> </clipPath> </defs> </svg>';
      return str;
  }
  // custom code end

  public documentClick(args: MouseEvent): void {
      const target: HTMLElement = args.target as HTMLElement;
      const selectedElement: Element = document.querySelector('.e-selected-style');

      // Remove 'e-selected-style' class if target is not 'checked' or has no id
      if (selectedElement && target.id !== '' && target.id !== 'checked') {
          selectedElement.classList.remove('e-selected-style');
      }

      const drawingObject = this.getDrawingObject(target.id);
      if (drawingObject) {
          this.diagram.drawingObject = drawingObject;
          target.classList.add('e-selected-style');
      }

      this.diagram.tool = this.continuousDraw ? DiagramTools.ContinuousDraw : DiagramTools.DrawOnce;
      this.diagram.dataBind();
  }
  //  method for  shape IDs to drawing objects
  private getDrawingObject(id: string): NodeModel | ConnectorModel | null {
      switch (id) {
          case 'shape1': return { shape: { type: 'Basic', shape: 'Rectangle' } };
          case 'shape2': return { shape: { type: 'Basic', shape: 'Ellipse' } };
          case 'shape3': return { shape: { type: 'Basic', shape: 'Hexagon' } };
          case 'shape4': return { shape: { type: 'Basic', shape: 'Pentagon' } };
          case 'shape5': return { shape: { type: 'Basic', shape: 'Triangle' } };
          case 'straight': return { type: 'Straight' };
          case 'ortho': return { type: 'Orthogonal' };
          case 'cubic': return { type: 'Bezier' };
          case 'freehand': return { type: 'Freehand' };
          case 'path': return { shape: { type: 'Path', data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z' } };
          case 'image': return { shape: { type: 'Image', source: './assets/images/diagram/tag.svg' } };
          case 'svg': return { shape: { type: 'Native', content: this.getNativeContent() } };
          case 'text': return { shape: { type: 'Text' } };
          default: return null;
      }
  }

  public diagramCreate(args: Object): void {
  // Initialize diagram with default drawing object and tool
      this.diagram.drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' } };
      this.diagram.tool = DiagramTools.ContinuousDraw;

  }
}
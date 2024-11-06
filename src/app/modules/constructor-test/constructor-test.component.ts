import { ExpandMode } from '@syncfusion/ej2-navigations';
import { Component, ViewChild } from '@angular/core';
import { Connector, ConnectorModel, Diagram, DiagramComponent, DiagramTools, GridlinesModel, IDragEnterEventArgs, MarginModel, NodeModel, PaletteModel, RulerSettingsModel, SnapSettingsModel, SymbolInfo, UmlClassifierShapeModel } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-constructor-test',
  templateUrl: './constructor-test.component.html',
  styleUrl: './constructor-test.component.scss'
})
export class ConstructorTestComponent {

  
  ngOnInit(): void {
    let node: NodeModel = {
        shape: {
          type: 'SwimLane',
          orientation: 'Horizontal',
          //Intialize header to swimlane
          header: {
            annotation: {
              content: 'ONLINE PURCHASE STATUS',
              style: { fill: '#111111' },
            },
            height: 50,
            style: { fontSize: 11 },
          },
          lanes: [
            {
              id: 'stackCanvas1',
              height: 100,
              header: {
                annotation: { content: 'CUSTOMER' },
                width: 50,
                style: { fontSize: 11 },
              },
            },
          ],
          phases: [
           
          ],
          phaseSize: 20,
        },
        offsetX: 300,
        offsetY: 200,
        height: 200,
        width: 350,
      };
      // initialize Diagram component
      let diagram: Diagram = new Diagram({
        width: '100%',
        height: '600px',
        // Add node
        nodes: [node],
      });
      // render initialized Diagram
      diagram.appendTo('#element');
  }

  
}
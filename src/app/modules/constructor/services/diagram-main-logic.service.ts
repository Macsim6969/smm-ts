import { Injectable } from "@angular/core";
import { DiagramComponent } from "@syncfusion/ej2-angular-diagrams";
import { timer } from "rxjs";

@Injectable()

export class DiagramMainLogicService{
  private saveData: any;

  public saveDiagram(diagram: DiagramComponent):void{
    timer(250).subscribe(() => {
      this.saveData = diagram.saveDiagram();
      localStorage.setItem('diagram', this.saveData);
    });
  }
}
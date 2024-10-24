import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConstructorComponent } from './constructor.component';
import {
  BpmnDiagramsService,
  ComplexHierarchicalTreeService,
  ConnectorBridgingService,
  ConnectorEditingService,
  DataBindingService,
  DiagramContextMenuService,
  DiagramModule,
  Ej1SerializationService,
  HierarchicalTreeService,
  LayoutAnimationService,
  MindMapService,
  PrintAndExportService,
  RadialTreeService,
  SnappingService,
  SymbolPaletteModule,
  SymmetricLayoutService,
  UndoRedoService,
} from '@syncfusion/ej2-angular-diagrams';
import { NgModule } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [{ path: '', component: ConstructorComponent }];

@NgModule({
  declarations: [ConstructorComponent, SettingsDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    DiagramModule,
    SymbolPaletteModule,
    DialogModule,
  ],
  providers: [
    HierarchicalTreeService,
    MindMapService,
    RadialTreeService,
    ComplexHierarchicalTreeService,
    DataBindingService,
    SnappingService,
    PrintAndExportService,
    BpmnDiagramsService,
    SymmetricLayoutService,
    ConnectorBridgingService,
    UndoRedoService,
    LayoutAnimationService,
    DiagramContextMenuService,
    ConnectorEditingService,
    Ej1SerializationService,
  ],
})
export class ConstructorModule {}

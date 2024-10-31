import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorTestComponent } from './constructor-test.component';
import { RouterModule, Routes } from '@angular/router';
import { DiagramModule, OverviewModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { ShareModule } from '../../shared/module/share.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: ConstructorTestComponent }
]

@NgModule({
  declarations: [
    ConstructorTestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    DiagramModule,
    SymbolPaletteModule,
    DialogModule,
    ShareModule,
    HttpClientModule ,
    OverviewModule,
    CheckBoxModule
  ]
})
export class ConstructorTestModule { }

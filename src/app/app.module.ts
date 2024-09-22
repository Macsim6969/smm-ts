import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { IsFilePopupSettingsService } from './shared/services/isFilesPopupSettings.service';
import { AddedFilesPopupComponent } from './shared/components/added-files-popup/added-files-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddedFilesPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    IsFilePopupSettingsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
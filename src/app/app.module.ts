import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { PageManagementService } from './shared/services/pageManagment.service';
import { ApiService } from './api/api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShareModule } from './shared/module/share.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    RouterModule
  ],
  providers: [
    PageManagementService,
    ApiService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
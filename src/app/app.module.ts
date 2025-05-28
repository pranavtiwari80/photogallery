import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFlowersComponent } from './components/list-flowers/list-flowers.component';
import { TopFiltersComponent } from './components/top-filters/top-filters.component';
import { HttpClientModule } from '@angular/common/http'; // <-- Add this


@NgModule({
  declarations: [
    AppComponent,
    ListFlowersComponent,
    TopFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

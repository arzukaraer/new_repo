import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { DetailsComponent } from './details/details.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule}  from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'details/:ticker', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavigationComponent,
    WatchlistComponent,
    DetailsComponent,
    PortfolioComponent,
    

    


  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatTabsModule,
    HighchartsChartModule
    
    

  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

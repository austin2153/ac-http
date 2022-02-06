import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { LoggingService } from './services/logging.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // order matters
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthService, 
    multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoggingService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

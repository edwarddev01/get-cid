import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { GetCidComponent } from './get-cid/get-cid.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloaderComponent } from './preloader/preloader.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; 
import { AuthInterceptor, AuthTokenInterceptor, AuthUnauthorizedInterceptor } from './interceptors/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListTokensComponent } from './list-tokens/list-tokens.component';
import { GenerateTokenComponent } from './generate-token/generate-token.component';
import { ListRecordsComponent } from './list-records/list-records.component';
@NgModule({
  declarations: [
    AppComponent,
    GetCidComponent,
    PreloaderComponent,
    LoginComponent,
    HomeComponent,
    ListTokensComponent,
    GenerateTokenComponent,
    ListRecordsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthTokenInterceptor,
      multi:true
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:AuthUnauthorizedInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

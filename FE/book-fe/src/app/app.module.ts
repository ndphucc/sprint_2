import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SecurityModule} from './security/security.module';
import {BookModule} from './book/book.module';
import {HttpClientModule} from '@angular/common/http';
import {BodyComponent} from './body/body.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {PaypalModule} from './paypal/paypal.module';
import {UserModule} from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      SecurityModule,
      BookModule,
      PaypalModule,
      UserModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
      ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

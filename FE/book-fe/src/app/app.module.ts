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
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {StatisticalModule} from './statistical/statistical.module';

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
      ReactiveFormsModule,
      MatSliderModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      MatSelectModule,
      MatOptionModule,
      MatTabsModule,
      MatIconModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatPaginatorModule,
      MatCheckboxModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      StatisticalModule
    ],
  providers: [
    AngularFireStorage
  ],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}

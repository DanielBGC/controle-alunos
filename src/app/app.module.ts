import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { routes } from './app-routing2.module';


// MÓDULOS ANGULAR
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import localePt from '@angular/common/locales/pt'
import { FormsModule } from "@angular/forms"
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 


// COMPONENTES ANGULAR MATERIAL 
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { ToastrModule } from 'ngx-toastr';

// import { MatMomentDateModule } from "@angular/material-moment-adapter"

// COMPONENTES DE TERCEIROS
import { NgSelectModule } from '@ng-select/ng-select'  ;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// DIRETIVAS
import { RedDirective } from './directives/red.directive';

// COMPONENTES
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component'
import { HomeComponent } from './views/home/home.component';
import { AlunoCrudComponent } from './views/aluno-crud/aluno-crud.component';
import { AlunoReadComponent } from './components/aluno/aluno-read/aluno-read.component';
import { ProductRead2Component } from './components/aluno/product-read2/product-read2.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { BackgroundComponent } from './views/background/blank.component'


registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    AlunoCrudComponent,
    RedDirective,
    AlunoReadComponent,
    ProductRead2Component,
    ComboboxComponent,
    PagamentosComponent,
    LoginComponent,
    BackgroundComponent
  ],
  imports: [
    // AppRoutingModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),

    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgSelectModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

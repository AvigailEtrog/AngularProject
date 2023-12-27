import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentsListComponent } from './components/presents-list/presents-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPresentComponent } from './components/edit-present/edit-present.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { EditDonorComponent } from './components/edit-donor/edit-donor.component';
import { PresentsPurchaseComponent } from './components/presents-purchase/presents-purchase.component';
import { CartComponent } from './components/cart/cart.component';
import { RandomComponent } from './components/random/random.component';
import { ReportComponent } from './components/report/report.component';
import { DataViewModule } from 'primeng/dataview';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
// import { ImageUploadComponent } from './components/image-upload/image-upload.component';
// import { ImageDisplayComponent } from './components/image-display/image-display.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentsListComponent,
    EditPresentComponent,
    HomeComponent,
    DonorsListComponent,
    EditDonorComponent,
    PaymentComponent,
    PresentsPurchaseComponent,
    CartComponent,
    RandomComponent,
    ReportComponent
    
  ],
  imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        DropdownModule,
        ButtonModule,
        CalendarModule,
        FileUploadModule,
        ReactiveFormsModule,
        RouterModule,
        DataViewModule,
        InputMaskModule,
        KeyFilterModule,
        CarouselModule,
        CardModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

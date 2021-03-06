import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { CalculatorOneComponent } from './calculator/CalculatorOne.component';
import { CalculatorTwoComponent } from './calculator/CalculatorTwo.component';
import { CalculatorResultComponent } from './calculator/calculatorResult.component';
import { ProductListComponent } from './listing/productList.component';

@NgModule({
  declarations: [
    AppComponent
    , GreeterComponent
    , CalculatorOneComponent
    , CalculatorTwoComponent
    , CalculatorResultComponent
    , ProductListComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
 
import { HighlightModule } from 'ngx-highlightjs';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';

export function hljsLanguages() {
  return [
    {name: 'javascript', func: javascript },
    {name: 'json', func: json },
  ];
}

import { AppComponent } from './app.component';
import { RangeValidatorDirective } from './range-validator/range-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    RangeValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MaterialModule,

    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

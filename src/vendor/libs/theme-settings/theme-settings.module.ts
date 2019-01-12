import { NgModule } from '@angular/core';


// *******************************************************************************
// _services

import { ThemeSettingsService } from './theme-settings.service';


// *******************************************************************************
//

@NgModule({
  providers: [
    ThemeSettingsService
  ]
})
export class ThemeSettingsModule { }

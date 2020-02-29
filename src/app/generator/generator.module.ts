import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GeneratorPage } from './generator.page';
import { SettingHelperComponent } from './setting-helper/setting-helper.component';
import { WorkingInfoComponent } from './working-info/working-info.component';
import { TodayScheduleDisplayComponent } from './working-info/today-schedule-display/today-schedule-display.component';
import { GeneratorEventService } from './generator-event.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: GeneratorPage }])
  ],
  providers: [GeneratorEventService],
  declarations: [GeneratorPage, SettingHelperComponent, WorkingInfoComponent, TodayScheduleDisplayComponent]
})
export class GeneratorPageModule { }

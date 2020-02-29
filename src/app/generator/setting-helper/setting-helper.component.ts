import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GeneratorEventService } from '../generator-event.service';

@Component({
  selector: 'app-setting-helper',
  templateUrl: './setting-helper.component.html',
  styleUrls: ['./setting-helper.component.scss'],
})
export class SettingHelperComponent implements OnInit {

  @Output() settingSelected = new EventEmitter<string>();

  optionForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private generatorService: GeneratorEventService) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.optionForm = this.formBuilder.group({
      workDate: [new Date().toISOString(), [Validators.required]],
      workTimeGroup: ['', [Validators.required]],
      leaderName: ['', Validators.required],
      numberOfworker: ['', Validators.required],
      startTime: ['', Validators.required]
    })
  }

  submitForm() {
    this.isSubmitted = true;
    this.generatorService.setWorkingDate({ isNightTime: this.optionForm.value.workTimeGroup === 'night', date: this.optionForm.value.workDate })
    this.settingSelected.emit(this.getOverviewText());
  }

  getOverviewText(): string {
    return this.getDate() + this.getWorkerInfo();
  }

  getDate(): string {
    return this.toFullDate(new Date(this.optionForm.value.workDate));
  }

  toFullDate(date: Date): string {
    const month = date.getMonth() + 1;
    return date.getFullYear() + '년 ' + month + '월 ' + date.getDate() + '일';
  }

  getWorkerInfo(): string {
    return ` ${this.optionForm.value.leaderName}외 ${this.optionForm.value.numberOfworker}명`;
  }

  modify() {
    this.isSubmitted = false;
    this.settingSelected.emit('');
  }
}
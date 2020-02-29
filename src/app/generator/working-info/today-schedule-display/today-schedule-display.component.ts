import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-today-schedule-display',
  templateUrl: './today-schedule-display.component.html',
  styleUrls: ['./today-schedule-display.component.scss'],
})
export class TodayScheduleDisplayComponent implements OnInit {

  @Input() day: string;
  @Input() locations: string[];
  @Input() deviceLocations: string[];

  constructor() { }

  ngOnInit() { }

}

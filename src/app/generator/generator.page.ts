import { Component } from '@angular/core';
import { GeneratorEventService } from './generator-event.service';

@Component({
  selector: 'app-generator',
  templateUrl: 'generator.page.html',
  styleUrls: ['generator.page.scss']
})

export class GeneratorPage {

  overviewText: string = '';

  constructor(private generateService: GeneratorEventService) { }

  setSettingValues(overviewText: string) {
    this.overviewText = overviewText;
  }
}

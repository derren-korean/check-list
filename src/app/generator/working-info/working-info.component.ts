import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeneratorEventService, DayLocationMap } from '../generator-event.service';
import { map, last } from 'rxjs/operators';

class CategoryCount {
  constructor(
    private category: string,
    private count: number
  ) { }
  getCount() {
    return this.count;
  }
  addCount(count: number) {
    this.count += count;
  }
}

@Component({
  selector: 'app-working-info',
  templateUrl: './working-info.component.html',
  styleUrls: ['./working-info.component.scss'],
})
export class WorkingInfoComponent implements OnInit {

  date: Date;
  categoryMap: CategoryCount = null;

  weekOfLocations: DayLocationMap = null;
  weekOfDeviceLocations: CategoryCount[] = [];

  monthOfLocations: DayLocationMap = null;
  monthOfDeviceLocations: CategoryCount[] = [];

  constructor(private generateService: GeneratorEventService) { }

  ngOnInit() {
    this.generateService.getWorkingDate().subscribe(date => {
      this.date = date;
      this.displaySchedule();
    })
  }

  displaySchedule() {
    if (this.date) {
      // 주/월/반/분/연간 정보를 입력한다.
      this.weekOfLocations = this.generateService.getWeekLocations(this.date.getDay());
      this.monthOfLocations = this.generateService.getMonthLocations(this.date.getDate());
      // 카테고리에 맞춰서 카운팅하기
      // 카데고리별 다 json으로 추가해야함
      this.generateService.getCategories()
        .forEach((category: string) => {
          // TODO: 장소 글자 맞추기, 숫자가 틀림.
          this.fillWeekCategoryCount(category);
          this.fillMonthCategoryCount(category);
        });
    } else {
      // 일간 정보를 입력
    }
  }
  private fillWeekCategoryCount(category: string) {
    let categoryMap = new CategoryCount(category, 0);
    this.weekOfDeviceLocations.push(categoryMap);
    this.weekOfLocations.locations.forEach(location => {
      this.generateService.getDeviceCategoiesNCount(category, location)
        .subscribe(count => {
          categoryMap.addCount(count);
          this.weekOfDeviceLocations[category] = categoryMap.getCount();
        });
    })
  }

  private fillMonthCategoryCount(category: string) {
    let categoryMap = new CategoryCount(category, 0);
    this.monthOfDeviceLocations.push(categoryMap);
    this.monthOfLocations.locations.forEach(location => {
      // 카테고리에 따라서 다른 정책을 써야한다.
      // X-RAY의 경우 장소(1-9호기)는 1-9호기만 가져오거나, 장소의 1-9호기만 가져온다.
      // 장소(category)일 경우 
      this.generateService.getDeviceCategoiesNCount(category, location)
        .subscribe(count => {
          debugger;
          categoryMap.addCount(count);
          this.monthOfDeviceLocations[category] = categoryMap.getCount();
        });
    })
  }
}

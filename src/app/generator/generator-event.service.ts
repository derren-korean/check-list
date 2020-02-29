import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface categoryNDeviceMap {
  category: string, devices: string[]
}

export interface DayLocationMap {
  day: string, locations: string[]
}

interface SectionLoctionMap {
  section: string, locations: string[]
}

export interface WorkingDate {
  isNightTime: boolean, date: string
}

interface Device {
  id?: string,
  category: string,
  serialNumber: string,
  name: string,
  location: string,
  station: string
}

@Injectable()
export class GeneratorEventService {

  private _date = new BehaviorSubject<Date>(null);
  private _weekLocationsMap: DayLocationMap[] = [];
  private _monthLocationsMap: DayLocationMap[] = [];
  private _categories: string[] = [];
  private _sectionsLocationsMap: SectionLoctionMap[] = [];

  constructor(private http: HttpClient) {
    this.initDeviceNLocations();
  }

  private initDeviceNLocations() {
    this.getHTTPCategories().forEach(arr => this._categories = arr);

    this.getHTTPSectionLocation().forEach(arr => this._sectionsLocationsMap = arr);
    this.getHTTPWeekOfDayLocation().forEach(arr => this._weekLocationsMap = arr);
    this.getHTTPMonthOfDayLocation().forEach(arr => this._monthLocationsMap = arr);
  }

  setWorkingDate(workingDate: WorkingDate) {
    this._date.next(workingDate.isNightTime ? new Date(workingDate.date) : null);
  }

  getWorkingDate() {
    return this._date.asObservable();
  }

  getWeekLocations(day: number) {
    return [...this._weekLocationsMap][day];
  }

  getMonthLocations(date: number) {
    return [...this._monthLocationsMap][date];
  }

  getCategories() {
    return [...this._categories];
  }

  // 이 매쏘드는 추후 device만 반환 할 수 있도록 해야한다.
  // 특정 station만 필요로 할 수 있기 때문이다.
  getDeviceCategoiesNCount(category: string, section: string) {
    const locations: string[] = this.getLocations(section);
    let count: number = 0;
    return this.getHTTPDevice(category).pipe(take(1), map(devices => {
      for (const location of locations) {
        count += devices.filter(device => device.location === location).length;
      }
      return count;
    }))
  }

  private getLocations(section: string): string[] {
    const map: SectionLoctionMap = this._sectionsLocationsMap.find((el: SectionLoctionMap) => el.section === section);
    return map ? [...map.locations] : [section];
  }

  private getHTTPDevice(category: string) {
    return this.http.get<Device[]>(`../../assets/${category}deviceData.json`)
      .pipe(
        take(1),
        map((arr: Device[]) => {
          return this.getElementOf(arr);
        })
      )
  }

  private getHTTPCategories() {
    return this.http.get<categoryNDeviceMap[]>('../../assets/categoryNDevices.json')
      .pipe(
        take(1),
        map(arr => {
          const _temp: string[] = []
          for (const index in arr) {
            if (arr.hasOwnProperty(index)) {
              const element = arr[index];
              _temp.push(element.category);
            }
          }
          return [..._temp]
        })
      )
  }

  private getHTTPWeekOfDayLocation() {
    return this.http.get<DayLocationMap[]>('../../assets/weekOfDayLocation.json')
      .pipe(take(1), map(_arr => this.getElementOf(_arr))
      )
  }

  private getHTTPMonthOfDayLocation() {
    return this.http.get<DayLocationMap[]>('../../assets/monthOfDayLocation.json')
      .pipe(take(1), map(_arr => this.getElementOf(_arr))
      )
  }

  private getHTTPSectionLocation() {
    return this.http.get<SectionLoctionMap[]>('../../assets/SectionNlocationMap.json')
      .pipe(take(1), map(_arr => this.getElementOf(_arr))
      )
  }

  private getElementOf(_arr: any[]) {
    const _temp = []
    for (const index in _arr) {
      if (_arr.hasOwnProperty(index)) {
        const element = _arr[index];
        _temp.push(element);
      }
    }
    return [..._temp];
  }

}
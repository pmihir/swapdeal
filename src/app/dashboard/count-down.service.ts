import { Injectable } from '@angular/core';
import {Observable,timer,interval, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountDownService {

  constructor() { }
  getCounter(tick) {
    return timer(0, tick);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private sharedData$: Observable<any> = this.sharedDataSubject.asObservable();

  setData(data: any) {
    console.log("Data set:", data); 
    this.sharedDataSubject.next(data);
  }

  getData(): Observable<any> {
    return this.sharedData$;
  }
}

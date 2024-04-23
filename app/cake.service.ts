import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private apiUrl = 'http://localhost:5000/api/cakes';

  constructor(private http: HttpClient) {}
  deleteCakeByName(name: string): Observable<any> {
    // Assuming your backend API now accepts DELETE requests with the cake's name
    return this.http.delete(`${this.apiUrl}?name=${name}`);
  }
  getExistingImageNames(): Promise<any> {
    return this.http.get(`${this.apiUrl}/existingImageNames`).toPromise();
    // Assuming your API has a route to fetch existing image names, adjust the URL accordingly
  }
  getAllCakes(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
  addCake(cake: any): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching cakes:', error);
          throw error;
        })
      )
      .pipe(
        catchError(() => {
          // If cakes.js doesn't exist or is empty, return an empty array
          return [];
        })
      )
      .pipe(
        switchMap((cakes: any[]) => {
          cakes.push(cake);
          return this.http.put(this.apiUrl, cakes)
            .pipe(
              catchError(error => {
                console.error('Error adding cake:', error);
                throw error;
              })
            );
        })
      );
  }

  getCakes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching cakes:', error);
          throw error;
        })
      )
      .pipe(
        catchError(() => {
          // If cakes.js doesn't exist or is empty, return an empty array
          return [];
        })
      );
  }
}

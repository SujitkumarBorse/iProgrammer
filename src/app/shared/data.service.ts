import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private _http: HttpClient) {
  }
  // return this._http.get(`${this.url}?_limit=${endLimit}`);
  getPhotos(endLimit: number) {
    // debugger;
    return this._http.get(`${this.url}?_limit=${endLimit}`).pipe(map(response => response));
  }

}

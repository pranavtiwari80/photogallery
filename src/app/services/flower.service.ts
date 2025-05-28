import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../models/flower.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  private apiUrl =
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&text=flowers&api_key=${environment.flickrApiKey}&format=json&nojsoncallback=1&page=1&per_page=20`;
  private apiKey = 'a5e95177da353f58113fd60296e1d250';
  private baseUrl = 'https://api.flickr.com/services/rest/';
  private perPage = 20;

  constructor(private http: HttpClient) {}


   getFlowers(filter: string = 'flowers', page: number = 1, colorCode?: number): Observable<any> {
    let url = `${this.baseUrl}?method=flickr.photos.search&text=flowers&api_key=${this.apiKey}&format=json&nojsoncallback=1&page=${page}&per_page=${this.perPage}`;
    if (colorCode !== undefined) {
      url += `&color_codes=${colorCode}`;
    }
    return this.http.get(url);
  }

  getTotlalPhotos(filter: string): Observable<number> {
    const params = new HttpParams().set('filter', filter);
    return this.http.get<number>(`${this.apiUrl}/count`, { params });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IformGetCid, IgetCid } from '../interfaces/get-cid.interface';
import { apiUrl } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GetCidService {

  constructor(private http: HttpClient) { }
  getCid(data: IformGetCid): Observable<IgetCid> {
    return this.http.post<IgetCid>(`${apiUrl}/get-cid`,data);
  }
}


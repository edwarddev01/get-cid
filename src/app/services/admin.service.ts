import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../environment/environment';
import { Itoken, IGToken, Itokens } from '../interfaces/token.interface';
import { Observable } from 'rxjs';
import { Irecord } from '../interfaces/record.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  genarateToken(data:IGToken){
    return this.http.post<Itoken>(`${apiUrl}/admin/token`,data);
  }
  getAllTokens():Observable<Itokens[]>{
    return this.http.get<Itokens[]>(`${apiUrl}/admin/tokens`);
  }

  getAllRecords():Observable<Irecord[]>{
    return this.http.get<Irecord[]>(`${apiUrl}/admin/records`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin, Iresponse } from '../interfaces/login.interface';
import { apiUrl } from '../environment/environment';
import { Itoken } from '../interfaces/token.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(data: Ilogin){
    return this.http.post<Iresponse>(`${apiUrl}/admin/login`,data);
  }

  genarateToken(): Observable<Itoken> {
    return this.http.get<Itoken>(`${apiUrl}/admin/token`);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  apiurl = 'https://localhost:44363/api/BusinessUser';
  update(id: string, amele: Amele): Observable<any> {
      return this.http.post(`${this.apiUrl}/Update?id=${id}`, amele);
    }
}

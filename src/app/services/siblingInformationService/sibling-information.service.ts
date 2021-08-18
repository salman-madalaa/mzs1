import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingInformationService {

  constructor(private http: HttpClient) { }

  updateSibInfo(id: number, ob): Observable<any> {
    let body = JSON.stringify(ob);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put("/api/siblingInformation/" + id, body, options)
  }

  public delete(id: number) {
    return this.http.delete("/api/siblingInformation/" + id);
  }
}

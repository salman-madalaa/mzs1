import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getAllStudentsCount(): Observable<any> {
    return this.http.get('/api/student/normal/all/count');
  }

  public getAllRteStudentsCount(): Observable<any> {
    return this.http.get('/api/student/rte/all/count');
  }

  public getStudentsClassCount(className): Observable<any> {
    return this.http.get('/api/student/normal/' + className + '/classCount');
  }
  public getRteStudentsClassCount(className): Observable<any> {
    return this.http.get('/api/student/rte/' + className + '/classCount');
  }

}

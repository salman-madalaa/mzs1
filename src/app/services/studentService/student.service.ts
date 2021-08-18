import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public Create(ob): Observable<any> {
    let body = JSON.stringify(ob);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post("/api/student/new", body,options);
  }

  public getAllStudents(pageable): Observable<any> {
    return this.http.get('/api/student/all');
  }

  public getStudents(className): Observable<any> {
    return this.http.get('/api/student/class/' + className);
  }

  updateStudent(registrationId: number, ob): Observable<any> {
    let body = JSON.stringify(ob);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put("/api/student/" + registrationId, body, options)
  }

  public delete(id: number) {
    return this.http.delete("/api/student/" + id);
  }

  logout() {
    return this.http.get("/api/student/logout");
  }


  //---------------------normal Students ------------------------

  public getAllNormalStudents(pageable): Observable<any> {
    return this.http.get('/api/student/normal/all');
  }


  public getNormalClassStudents(className): Observable<any> {
    return this.http.get('/api/student/normal/class/' + className);
  }


  //---------------------Rte Students ------------------------
  public getAllRteStudents(pageable): Observable<any> {
    return this.http.get('/api/student/rte/all');
  }


  public getRteClassStudents(className): Observable<any> {
    return this.http.get('/api/student/rte/class/' + className);
  }


}

/*
public getAllStudents(pageable):Observable<any>
{
    return this.http.get("/api/student",{
        params: new HttpParams()
            .set('page',  pageable.page)
            .set('size',  pageable.size)
            .set('sort',  pageable.sort.field).append()
          });
    http://localhost:8084/api/cm/ecos?page=0&size=20&sort=modifiedDate:DESC
    return this.http.get('/api/student?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field+':'+pageable.sort.order);

}
*/

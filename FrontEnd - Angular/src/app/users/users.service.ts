import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    var url = baseUrl + '/Users';
    //var header = new Headers();
    //headers.append('Content-Type', 'application/json');
    return this.http.get(url, {responseType: 'json'});
  }

  getbyId(id:string):Observable<any>{
    var url = baseUrl + '/Users/'+ id;
    var headers = new Headers();
    ////headers.append('Content-Type', 'application/json');
    return this.http.get(url, {responseType: 'json'});
  }

  updateUser(id:string, data:any):Observable<any>{
    var url = baseUrl + '/Users/'+ id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, data, {responseType: 'json'});
  }

  addUser(data:any):Observable<any>{
    var url = baseUrl + '/Users/NewUser';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, data,{responseType: 'json'});
  }

  deleteUser(id:string){
    var url = baseUrl + '/Users/'+ id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(url, {responseType: 'json'});
  }

  changePassword(id:string, data:any):Observable<any>{
    var url = baseUrl + '/Users/ChangePassword/'+ id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, data, {responseType: 'json'});
  }

  
}

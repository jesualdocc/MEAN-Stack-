import { baseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
//import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
//import { StorageServiceModule} from 'angular-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  tempStorage:Map<string, any>;

  constructor(private http:HttpClient) {
   this.tempStorage = new Map();
   }

  loginHandler(data:any):Observable<any>{
    var url = baseUrl + '/Login';
    return this.http.post( url, data, {responseType:'json'});
  }

  private setSession(authResult:any){
    const expiresAt = moment().add(authResult.expiresIn, 'hour');
    
    this.tempStorage.set('idToken', authResult.token);
    this.tempStorage.set("expiresAt", JSON.stringify(expiresAt.valueOf()));
  }
  
  logout() {
    this.tempStorage.delete("idtoken");
    this.tempStorage.delete("expiresAt");
}

public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration:any = this.tempStorage.get("expiresAt");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    

}

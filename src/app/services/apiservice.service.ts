import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConstantserviceService } from './constantservice.service';
import { UtilserviceService } from './utilservice.service';
import { environment } from 'src/environments/environment';
import { FILE } from 'dns';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  local_url = 'http://localhost:3000/api/';
  live_url = 'http://localhost:3000/api/';
  

  constructor(
    public util: UtilserviceService,
    public http: HttpClient,
    private router: Router,
    public constant: ConstantserviceService
  ) {
   

  }

  private _headerInit(): HttpHeaders {
    let headers: any = new HttpHeaders();
    if (window.localStorage.getItem(this.constant.ACCESS_TOKEN) != null) {
      headers = headers.append(
        "Authorization", "Bearer " +
        window.localStorage.getItem(this.constant.ACCESS_TOKEN)
      );
    }
    return headers;
  }



  public get_url() {
    if (environment.production) {
      return this.live_url;
    } else {
      return this.local_url;
    }
  }
  POST_API(url, data) {
    return new Promise((resolve, reject) => {
      // this.util.showLoading();
      this.http.post(this.get_url() + url ,data)
        .subscribe(data => {
          // console.log(data);
          // @ts-ignore
          if (data.status == 200 || data.status == 404 || data.status == 403) {
            // @ts-ignore
            //this.util.closeLoading();
            resolve(data);
          } else {
            // @ts-ignore
            // this.apiResponseHandle(data.status, data.message);
            // this.util.closeLoading();
          }
        }, (err) => {
          // this.util.closeLoading();
          reject("error");
        });
    });
  }

  AUTH_POST_API(url, data) {
    const headers: any = this._headerInit();
    const options = { headers: headers };
    return new Promise((resolve, reject) => {
      // this.util.showLoading();
      this.http.post(this.get_url() + url, data , {headers})
        .subscribe((data: any) => {
          // console.log(data);
          // @ts-ignore
          if (data.status == 200 || data.status == 404 || data.status == 403) {
            // @ts-ignore
            //this.util.closeLoading();
            resolve(data);
          } else {
            // @ts-ignore
            //this.util.closeLoading();
            // @ts-ignore
            // this.apiResponseHandle(data.status, data.message , data.value);
            //console.log(data);
          }
        }, (err) => {
          // this.util.closeLoading();
          //console.log(err);
          reject("err");
        });
    });
  }

  AUTH_GET_API(url) {
    const headers: any = this._headerInit();
    const options = { headers: headers };
    return new Promise((resolve, reject) => {
      // this.util.showLoading();
      this.http.get(this.get_url() + url , {headers})
        .subscribe((data: any) => {
          // console.log(data);
          // @ts-ignore
          if (data.status == 200 || data.status == 404 || data.status == 403) {
            // @ts-ignore
            //this.util.closeLoading();
            resolve(data);
          } else {
            // @ts-ignore
            //this.util.closeLoading();
            // @ts-ignore
            // this.apiResponseHandle(data.status, data.message , data.value);
            //console.log(data);
          }
        }, (err) => {
          // this.util.closeLoading();
          //console.log(err);
          reject("err");
        });
    });
  }


  async POST_DOCUMENT(url, data, name) {
    const formData = new FormData();
    // // Store form name as "file" with file data
    formData.append("file", data, name);
    // console.log(data, name);
    // this.logs('api post_method data', JSON.stringify(data));
    // let postdata = {
    //   file : F
    // }
    // postdata.file = formData
    //   console.log(postdata);
    return new Promise((resolve, reject) => {
      this.http.post(this.get_url() + url, formData)
        .subscribe(data => {
          // @ts-ignore
          if (data.status == 200 || data.status == 404 || data.status == 403) {
            // @ts-ignore
            resolve(data);
          } else {
            // @ts-ignore
            this.apiResponseHandle(data.status, data.message);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

}

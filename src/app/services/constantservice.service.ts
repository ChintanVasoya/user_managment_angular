import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConstantserviceService {

  /////////////////////////////////////////////  API  /////////////////////////////////////////////////
  NAME;
  sign_up_api  = 'signup';
  login_api = "login";
  update_api = "user";
  user_list = 'getUsers';
  delete_api = 'delete';
  email_pattern = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
  mobile_pattern = '^((\\+91-?)|0)?[0-9]{10}$';
  user_name;
  IS_LOGIN = "isLoggedIn";
  USER_DETAILS = "USER_DETAILS";
  ACCESS_TOKEN = 'ACCESS_TOKEN'

  constructor(

  ) { }

  
  public getLoginDetails() {
    let get_login: any = localStorage.getItem('login_details');
    const getLoginDetails = JSON.parse(get_login);
    return getLoginDetails.USER_DATA;
  }

  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays :any = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray : any = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

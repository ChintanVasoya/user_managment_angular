import { Injectable } from '@angular/core';
import * as custom from '../../assets/js/app-custom.js';
import Swal from 'sweetalert2/dist/sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UtilserviceService {

  constructor() { }
  
  Alert(TYPE, MSG) {
    //success
    //info
    //error
    //warning
     custom.notifyAlert(TYPE, MSG);
  }

  confirmBox() {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this Data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#ff0000',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        // console.log('confirmBox result', result);
        if (result.value) {
          /* Swal.fire(
               {
                   timer: 1000,
                   title: 'Deleted!',
                   text: 'Your imaginary file has been deleted.',
                   icon: 'success',
                   showConfirmButton: false
               }
           );*/
          // this.Alert('success', 'Your data has been deleted.');
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          /* Swal.fire(
               {
                   timer: 1000,
                   title: 'Cancelled',
                   text: 'Your imaginary file is safe :)',
                   icon: 'error',
                   showConfirmButton: false
               }
           );*/
          reject(false);
        }
      });
    });

  }

  exitBox() {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure want to exit?',
        text: 'You will not be able to recover this Data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#ff0000',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          /* Swal.fire(
               {
                   timer: 1000,
                   title: 'Deleted!',
                   text: 'Your imaginary file has been deleted.',
                   icon: 'success',
                   showConfirmButton: false
               }
           );*/
          // this.Alert('success','Your data has been deleted.');
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          /* Swal.fire(
               {
                   timer: 1000,
                   title: 'Cancelled',
                   text: 'Your imaginary file is safe :)',
                   icon: 'error',
                   showConfirmButton: false
               }
           );*/
          reject(false);
        }
      });
    });

  }
}

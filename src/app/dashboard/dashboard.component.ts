import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { ConstantserviceService } from '../services/constantservice.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import {Location} from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSubmitted = true;
  image_data;
  SignupForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    mobile_no: new FormControl(null),
    dob: new FormControl(null),
    email: new FormControl(null, [Validators.required , Validators.pattern(this.constant.email_pattern)]),
    password: new FormControl(null, [Validators.required]),
    profile_image: new FormControl('')
});
constructor( private location: Location, public router :Router ,public formBuilder: FormBuilder ,public util : UtilserviceService, public constant  : ConstantserviceService , public apiservice :ApiserviceService) { }

ngOnInit(): void {
  this.initForm();
}


initForm(){
  let data: any = localStorage.getItem(this.constant.USER_DETAILS)
    let user_details = JSON.parse(data);
  this.SignupForm = new FormGroup({
    username: new FormControl(user_details.username, [Validators.required]),
    mobile_no: new FormControl(user_details.mobile_no),
    dob: new FormControl(user_details.dob),
    email: new FormControl(user_details.email, [Validators.required , Validators.pattern(this.constant.email_pattern)]),
    password: new FormControl(user_details.password, [Validators.required]),
    profile_image: new FormControl(user_details.profile_image)
});
this.image_data = user_details.profile_image;
}

remove_img(){
  this.image_data = null;
  this.SignupForm.controls['profile_image'].setValue('');

}

handleUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      let data =  reader.result;
      if(data instanceof ArrayBuffer){
        const decoder = new TextDecoder();
        data = decoder.decode(data);
      }
         this.image_data = data
      this.SignupForm.controls['profile_image'].setValue(data);
  };
}

onSubmit(){
  this.isSubmitted = true;
  if(this.SignupForm.valid){
    let data = {
      'user' : this.SignupForm.value
    }
    this.apiservice.AUTH_POST_API(this.constant.update_api , data).then((data :any)=>{
      if(data.status == 200){
        localStorage.setItem(this.constant.IS_LOGIN, 'yes');
        localStorage.setItem(this.constant.USER_DETAILS , JSON.stringify(data.data));
        localStorage.setItem(this.constant.ACCESS_TOKEN, data.data.token);
        this.router.navigateByUrl('');
        this.util.Alert('success',data.message);
      }
    }).catch((err:any)=>{
    })
  }
}
deleteaccount(){
  this.util.confirmBox().then((data:any)=>{
    
    if(data == true){
      this.delete();
    }
  })
}
delete(){
  this.apiservice.AUTH_GET_API(this.constant.update_api).then((data:any)=>{
  let postdata = {
    id : data.id
  }
  this.apiservice.AUTH_POST_API(this.constant.delete_api , postdata).then((data :any)=>{
    if(data.status == 200){
     
      localStorage.clear();
      location.reload();
      this.util.Alert('success',data.message);
    }
  }).catch((err:any)=>{
  })
  })

 
}
}

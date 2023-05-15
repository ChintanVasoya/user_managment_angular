import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import { ConstantserviceService } from '../../services/constantservice.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  SignupForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    mobile_no: new FormControl(null),
    dob: new FormControl(null),
    email: new FormControl(null, [Validators.required , Validators.pattern(this.constant.email_pattern)]),
    password: new FormControl(null, [Validators.required]),
    profile_image: new FormControl('')
});;
isSubmitted = false;
Loading = false;
button_Flag = false;
showPassword = false;
image_data;
constructor( private location: Location ,public formBuilder: FormBuilder ,public util : UtilserviceService, public constant  : ConstantserviceService , public apiservice :ApiserviceService) { }

ngOnInit(): void {
}

remove_img(){
      this.SignupForm.controls['profile_image'].setValue('');
      this.image_data = null;
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
this.isSubmitted  = true;
if(this.SignupForm.valid){
let data = {
  user : this.SignupForm.value
}
this.apiservice.POST_API(this.constant.sign_up_api , data).then((data : any)=>{

  if(data.status == 200){
        this.util.Alert('success',"Signup successfully");
        this.location.back();
  }else{

  }
 });
}
}


}
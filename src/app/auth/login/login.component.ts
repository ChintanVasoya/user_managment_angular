import { Component, ElementRef, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ConstantserviceService } from 'src/app/services/constantservice.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(this.constant.email_pattern)]),
    password: new FormControl(null, [Validators.required]),
  });;
  isSubmitted = false;
  Loading = false;
  button_Flag = false;
  showPassword = false;
  constructor( public formBuilder: FormBuilder ,public apiservice :ApiserviceService , 
               public util : UtilserviceService, public constant  : ConstantserviceService,
               public router :Router) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required , Validators.pattern(this.constant.email_pattern)]),
        password: new FormControl(null, [Validators.required]),
    });
  }



  onSubmit(){
    this.isSubmitted  = true;
    if(this.loginForm.valid){
    let data = {
      user : this.loginForm.value
    }
    this.apiservice.POST_API(this.constant.login_api , data).then((data : any)=>{
  
      if(data.status == 200){
            localStorage.setItem(this.constant.IS_LOGIN, 'yes');
            localStorage.setItem(this.constant.USER_DETAILS , JSON.stringify(data.data));
            localStorage.setItem(this.constant.ACCESS_TOKEN, data.data.token);
            this.router.navigateByUrl('');
            this.util.Alert('success',"login successfully");
            
      }else{
            this.util.Alert('error',data.message);
      }
     });
    }
    }


}

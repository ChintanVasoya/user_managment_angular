import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ConstantserviceService } from 'src/app/services/constantservice.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() profile_flag = true;
  @Input() user_flag = true;
  constructor(public formBuilder: FormBuilder, public router: Router, public constant: ConstantserviceService, public api: ApiserviceService, public utilservice: UtilserviceService) { }
  FORM!: FormGroup;
  new_pass;
  confirm_pass;
  isSubmitted = false;
  menu_rights: any;
  @ViewChild('close') close;

  ngOnInit(): void {
    let data: any = localStorage.getItem(this.constant.USER_DETAILS)
    let user_details = JSON.parse(data);
    this.constant.NAME = user_details.username;    
    this.FORM = this.formBuilder.group({
      NEW_PASSWORD: [null, Validators.required],
      OLD_PASSWORD: [null, Validators.required],
      CONFIRM_PASSWORD: [null, Validators.required]
    });

  }

  Logout() {
    localStorage.clear();
    location.reload();
  }
  

}

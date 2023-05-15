import { Component } from '@angular/core';
import { ApiserviceService } from './services/apiservice.service';
import { ConstantserviceService } from './services/constantservice.service';
import { UtilserviceService } from './services/utilservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})





export class AppComponent {
  constructor(public constant: ConstantserviceService, public api: ApiserviceService, public utilservice: UtilserviceService) { 
    
  }
  ngOnInit(): void {
    
  }

}

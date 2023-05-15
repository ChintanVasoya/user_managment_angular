import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MAT_SORT_DEFAULT_OPTIONS,SortDirection, MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConstantserviceService } from 'src/app/services/constantservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent {
  tableSetting = {
    offset: '0',
    size: '10',
    sizeOption: [10, 25, 50, 100, 200],
    sort: '',
    order:'desc' as SortDirection,
  };
  flag = false;
  pagePermissions: any;
  COLUMNS: any;
  offset = '0';
  listsForm!: FormGroup;
  isSubmitted = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  columns: any = [];
  displayedColumns = [];
  dataSource = new MatTableDataSource();
  dataFooter;
  all_data;
  dataLength;

  constructor(
    public formBuilder: FormBuilder,
    public constant: ConstantserviceService,
    public apiservice: ApiserviceService,
    public route: ActivatedRoute,
    public utilservice: UtilserviceService,
    public router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.listsForm = this.formBuilder.group({
      search: [(this.route.snapshot.queryParamMap.get('search') == undefined) ? '' : this.route.snapshot.queryParamMap.get('search')],
    });
    this.getdata();
  }

  getdata() {
    let postdata = {
      sortBy: this.tableSetting.sort,
      OrderBy: this.tableSetting.order,
      limit: this.tableSetting.size,
      pageNumber: this.tableSetting.offset
    };
    let mergedData = Object.assign(postdata, this.listsForm.value);

    if (this.isSubmitted) {
      this.router.navigate([this.router.url.split('?')[0]], { queryParams: mergedData });
    }
    this.apiservice.AUTH_POST_API(this.constant.user_list, mergedData).then((result: any) => {
      if (result.data.data.length == 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }

      let data = result.data;
      this.columns = [{title : "Full Name",field : "username"},
                      {title : "Email",field : "email"},
                      {title : "Date of Birth",field : "dob"},
                      {title : "Mobile No" , field : "mobile_no"}
                      ];
      this.displayedColumns = this.columns.map(c => c.field)
      this.all_data = data.data
      this.dataSource.data = data.data;

      // this.dataFooter = data.footer;

      this.dataLength = data.totalPosts;
      
    }).catch((err) => {
    
    })
  }

  onSubmit() {
    this.tableSetting.offset = '0';
    this.isSubmitted = true;
    this.getdata();
  }

  onReset() {
    this.listsForm.controls['search'].setValue('');
    this.isSubmitted = true;
    this.getdata();
  }

  onPaginateChange(event: PageEvent) {
    this.tableSetting.offset = JSON.stringify(event.pageIndex);
    this.tableSetting.size = JSON.stringify(event.pageSize);

    this.isSubmitted = true;
    this.getdata();
  }
  sortData(sort: Sort) {
    this.tableSetting.sort = sort.active;
    this.tableSetting.order = (sort.direction);
    // this.global.logs('sort', sort)/
    this.isSubmitted = true;
    this.getdata();
  }

}

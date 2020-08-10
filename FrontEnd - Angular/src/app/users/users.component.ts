import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Users } from './Users';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource:any|undefined;
  user:Users[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'email', 'role', 'enrollmentDate'];
  

  constructor(private userService:UsersService, private router: Router) { 
    this.user = new Array();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getAllUsers().subscribe(data=>{
      //this.user = data;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      console.log(this.dataSource);
      console.log(this.dataSource.data);
    });

}
}

import { AddUserComponent } from './../modals/add-user/add-user.component';
import { baseUrl } from './../../environments/environment';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Users } from './Users';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit {

  
  formGroupAdd:FormGroup | undefined;
  dataSource:any|undefined;
  user:Users[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'email', 'role', 'enrollmentDate'];
  public selectedName:any;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;


  constructor(private userService:UsersService, private router: Router, private modalService: NgbModal,
    public matDialog: MatDialog) { 
    this.user = new Array();
  }

  ngOnInit(): void {
    this.getAll();
  }

  public highlightRow(user:any) {
    this.selectedName = user.userName;
    //console.log(this.expandedElement);
  }

  openAddUserModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "400px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AddUserComponent, dialogConfig);
  }

  openAddModal(){
    if(this.formGroupAdd?.valid){
      this.userService.addUser(this.formGroupAdd.value).subscribe(result=>{
        
       
      })

    }else{

    }

  }

  openFirstModalbyId(row:any){
    
    const modalRef = this.modalService.open(Main_Modal, {
      backdrop : 'static',
      keyboard : false, 
      size:'sm'
});
    modalRef.componentInstance.rowID = row._id;
  }

  getAll(){
    this.userService.getAllUsers().subscribe(data=>{
     
      this.dataSource = new MatTableDataSource();
      
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });}

}

@Component({
  templateUrl: './modals/main.html',
  styleUrls: ['./users.component.css']
})
export class Main_Modal {
  @Input() rowID:any;
  
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  edit() {
    const modalRef = this.modalService.open(Edit_Modal, {
      backdrop : 'static',
      keyboard : false, 
      size:'sm'
});

    modalRef.componentInstance.rowID = this.rowID;
  }

  delete() {
    const modalRef = this.modalService.open(Confirmation_Modal, {
      backdrop : 'static',
      keyboard : false, 
      size:'md'
});
    modalRef.componentInstance.rowID = this.rowID;
    modalRef.componentInstance.confirmationType = "Delete";
  }
}

@Component({
  templateUrl: './modals/editmodal.html',
  styleUrls: ['./users.component.css'],
})
export class Edit_Modal {
  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  templateUrl: './modals/confirmation.html',
  styleUrls: ['./users.component.css'],
})
export class Confirmation_Modal {
  @Input() rowID:any;
  @Input() confirmationType:string | undefined;

  constructor(public activeModal: NgbActiveModal, private userService:UsersService, private router: Router) {}

  refresh(){
    this.router.navigate(['/dashboard']);
  }
  yes(){
  
    if(this.confirmationType == "Delete"){
     
      this.userService.deleteUser(this.rowID).subscribe(data=>{
        for (const [key, value] of Object.entries(data)) {

          if(key == 'n'){
            if(value > 0){
              console.log("Deleted");
              this.refresh();
              break;
            }
            else{
              console.log("Not Deleted");
            }
          }
        }
      });
    }

    if(this.confirmationType == "Add"){

    }

    if(this.confirmationType == "Edit"){

    }
  }
  
}

// @Component({
//   styleUrls: ['./users.component.css'],
// })
// export class AddUser_Modal {
//   constructor(public activeModal: NgbActiveModal) {}

// }

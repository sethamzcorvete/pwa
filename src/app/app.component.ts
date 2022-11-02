import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'indexdb';
  public getvalue: any
  public rows: any;
  public columns: Array<object> = [];
  private keyName = "USERS";

  constructor(
      public LocalStorage: LocalStorageService
    ) {

  }

  ngOnInit(): void {
    this.columns = [
      { name: 'id', field: 'id' },
      { name: 'email', field: 'email' },
      { name: 'First Name', field: 'first_name' },
      { name: 'Last name', field: 'last_name' }
    ];


  }

  add() {
    let txtvalue = (<HTMLInputElement>document.getElementById("txtvalue")).value;
    console.log(txtvalue);
    this.LocalStorage.add("myname",txtvalue).then(res=>{
      if(res){
        alert("Inserted successfully");
      }
    })
  }

  get() {
    this.LocalStorage.get("myname").then(res=>{
      this.getvalue = res;
    })
  }


  delete() {
    this.LocalStorage.delete("myname").then(res=>{
      this.getvalue = res;
    })
  }
  sync() {
 
    this.LocalStorage.getData().subscribe((res: any) => {
      this.LocalStorage.sync(res);
    });

    this.LocalStorage.getDataComents().subscribe((res: any) => {
      console.log(res)
      this.LocalStorage.syncComents(res);
    });


    
    this.getDataTable();
    
  }


  getDataTable() {
    this.LocalStorage.loadData(this.keyName).then(res=>{
      console.log(res)
      this.rows = res;
    })
  }
  
}

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

declare var db: any
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public storagename = "CodeToDodb"
  public tableUsers = "tb_users"
  constructor(private http: HttpClient) { }

  sync(data: any){
    this.delete("USERS");
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {

          const request = await db.transaction([this.tableUsers], "readwrite").objectStore(this.tableUsers).put(data.data, "USERS");
    
          request.onsuccess = await function (event: { target: { result: any; }; }) {
            if (event.target.result) {
              console.log("success")
              resolve("success")
            } else {
              console.log("error")
              resolve(false)
            }
          }
    
      
      }
    });

  }

  syncComents(data: any){
    console.log(data)
    this.delete("COMENTS");
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {

          const request = await db.transaction([this.tableUsers], "readwrite").objectStore(this.tableUsers).put(data.products, "COMENTS");
    
          request.onsuccess = await function (event: { target: { result: any; }; }) {
            if (event.target.result) {
              console.log("success")
              resolve("success")
            } else {
              console.log("error")
              resolve(false)
            }
          }
    
      
      }
    });

  }
  

  loadData(keyname:any){
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.tableUsers], "readwrite")
        .objectStore(this.tableUsers).get(keyname);

        request.onsuccess =  await function (event: { target: { result: any; }; }) {
          if (event.target.result) {
            console.log("success")
            resolve(event.target.result)
          } else {
            console.log("error")
            resolve(false)
          }
        }
      }
    });
  }

  add(keyname: any, value: any) {
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storagename], "readwrite").objectStore(this.storagename).put(value, keyname);

        request.onsuccess = await function (event: { target: { result: any; }; }) {
          if (event.target.result) {
            console.log("success")
            resolve("success")
          } else {
            console.log("error")
            resolve(false)
          }
        }
      }
    });
  }



  get(keyname: any) {

    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storagename], "readwrite")
        .objectStore(this.storagename).get(keyname);

        request.onsuccess =  await function (event: { target: { result: any; }; }) {
          if (event.target.result) {
            console.log("success")
            resolve(event.target.result)
          } else {
            console.log("error")
            resolve(false)
          }
        }
      }
    });

  }

  delete(keyname: any) {

    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storagename], "readwrite").objectStore(this.storagename).delete(keyname);

        request.onsuccess =  await function (event: { target: { result: any; }; }) {
          if (event.target.result) {
            console.log("success")
            resolve("success")
          } else {
            console.log("error")
            resolve(false)
          }
        }
      }
    });


  }

  
  getData(): Observable<any> {
    return this.http.get<any>('https://mocki.io/v1/1ed591cd-3b05-4f29-a397-277242b7478f');
  }

  getDataComents(): Observable<any> {
    return this.http.get<any>('https://mocki.io/v1/d42c7816-b614-458a-bf72-be7e362afd93');
  }



}




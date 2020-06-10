import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

    orderState:any

  constructor(private afStore:AngularFirestore
    ) {
      this.orderState=this.afStore.collection('users')
     }


  addUserData(uid, userData){
    this.afStore.collection('users').doc(uid).set(userData)
  }
  updateUserOnDB(uid, userData) {
    this.afStore.collection('users').doc(uid).set(userData)
    Swal.fire({
      text:'Successfuly updated',
      icon:'success',
      possition:'top-top',
      showConfiguration:false,
      timer:1500
    })
  }


  getProductsFromDB() {
    return this.afStore.collection('goods').valueChanges({idField:'itemId'})
  }

  getOrderState(uid){
    return this.afStore.collection('users').doc(`${uid}/orderedItems`).valueChanges()
  }

  addToCardDB(uid,item,user) {
    let { orderedItems }=user;
    let quantity = 1;
    if (orderedItems && orderedItems.hasOwnProperty(item.itemId)) {
      quantity=orderedItems[item.itemId] +1
    }
    this.afStore.doc(`users/${uid}/`)
    .update({
      [`orderedItems.${item.itemId}`] : quantity
    }).then(res => {
      console.log(res,'Item added to cart')
    })
  }
  }
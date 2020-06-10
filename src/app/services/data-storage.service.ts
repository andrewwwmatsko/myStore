import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

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
  }


  getProductsFromDB() {
    return this.afStore.collection('goods').valueChanges({idField:'itemId'})
  }

  getOrderState(uid){
    return this.afStore.collection('users').doc(`${uid}/orderedItems`).valueChanges()
  }

  addToCardDB(uid,item) {
    this.afStore.collection('users').doc(uid).collection('orderedItems').get().toPromise()
    .then(res => {
      let orderedState= res.data().orderedItems
      debugger
      if(orderedState.hasOwnProperty(item.itemId)){
        
      } else {
        const updatedItem={
          "quantity": 1
        }
        this.afStore.collection('users').doc(`${uid}/orderedItems/${item.itemId}`).set(updatedItem)
      }
    })

  }


}

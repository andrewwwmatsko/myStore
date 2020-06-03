import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private afStore:AngularFirestore
    ) {

     }


  addUserData(uid, userData){
    this.afStore.collection('users').doc(uid).set(userData)
  }
}

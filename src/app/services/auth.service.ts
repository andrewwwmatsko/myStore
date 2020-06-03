import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import {DataStorageService} from './data-storage.service'
import { pipe, of } from 'rxjs'
import { switchMap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any

  constructor(
    private afAuth:AngularFireAuth,
    private router: Router,
    private afStore:AngularFirestore,
    private dataStorage: DataStorageService) {

     this.userData= this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afStore.doc(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      );

      this.userData.subscribe(console.log)

     }


  createUser (userData) {
    const {
      userName,
      password,
      email,
      phone,
      date
    } = userData

    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      this.dataStorage.addUserData(response.user.uid, {email, phone, date, userName})
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  log(userData){
    const {
      email, 
      password 
    } =userData

    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('logged in')
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  logOut() {
    this.afAuth.signOut();
    this.router.navigate(['login'])
  }
  

}

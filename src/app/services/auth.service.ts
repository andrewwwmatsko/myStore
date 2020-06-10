import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import {DataStorageService} from './data-storage.service'
import { pipe, of, from } from 'rxjs'
import { switchMap,} from 'rxjs/operators'
import Swal from 'sweetalert2/dist/sweetalert2.js'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any
  userId:string

  constructor(
    private afAuth:AngularFireAuth,
    private router: Router,
    private afStore:AngularFirestore,
    private dataStorage: DataStorageService) {

     this.userData= this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            this.userId=user.uid
            return this.afStore.doc(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      );
     

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
      // Swal.fire({
      //   text:'Account is created ',
      //   icon:'success',
      //   possition:'top-top',
      //   showConfiguration:false,
      //   timer:1500
      // })
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
      // Swal.fire({
      //   text:'You just logged in',
      //   icon:'success',
      //   possition:'top-top',
      //   showConfiguration:false,
      //   timer:1500
      // })
      this.router.navigate(['home'])
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

import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account'
import { AuthService } from '../../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';



@Component({
  selector: 'app-my-accout',
  templateUrl: './my-accout.component.html',
  styleUrls: ['./my-accout.component.css']
})
export class MyAccoutComponent implements OnInit {
  user:Account
  editModeEnabled:boolean
  userForm:FormGroup

  constructor(private authService:AuthService,
    private fb:FormBuilder,
    private dbs:DataStorageService) {
      this.userForm=this.fb.group({
        userName: ['',[Validators.required]],
        phone: ['',[Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        date: '',
      })
     }

  ngOnInit(): void {
    this.user=this.authService.userData.subscribe( user => {

      const {
        userName,
        phone,
        email,
        date
      } = user

      this.userForm.setValue({
        userName: userName,
        phone: phone,
        email: email,
        date: date,
      })
      
    })
  }

  switchEditMode() {
    this.editModeEnabled= !this.editModeEnabled
  }

  saveChangesHandler() {
    this.dbs.updateUserOnDB(this.authService.userId, this.userForm.value)
    this.editModeEnabled=null
  }
  cancelChangesHandler() {
    this.fillForm(this.user)
    this.editModeEnabled=null
  }
  
  fillForm (user) {
    this.user=user
    const {
      userName,
      phone,
      date,
      email
    }=user
    this.userForm.setValue({
      userName:userName,
      phone:phone,
      date:date,
      email:email
    })
  }
  
}
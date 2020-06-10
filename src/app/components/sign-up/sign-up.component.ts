import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registrationGroup= new FormGroup ({
    userName: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    date: new FormControl(''),
    password: new FormControl('',[Validators.required]),
    confirmPas: new FormControl('',[Validators.required])
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registrationGroup.valueChanges.subscribe((form) => {
      // console.log(form)
    })
  }


  registerHandler() {
    this.authService.createUser(this.registrationGroup.value)
  }
  
  onSubmit() {
    // console.log(this.registrationGroup.value)
  }


  get userName() {
    return this.registrationGroup.get('userName')
  }
  get email() {
    return this.registrationGroup.get('email')
  }
  get date() {
    return this.registrationGroup.get('date')
  }
  get password() {
    return this.registrationGroup.get('password')
  }
  get confirmPas() {
    return this.registrationGroup.get('confirmPas')
  }

}

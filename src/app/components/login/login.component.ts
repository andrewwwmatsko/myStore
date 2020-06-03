import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginGroup = new FormGroup ({
    email: new FormControl ('',[Validators.email, Validators.required]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private afAuth: AuthService) { }

  ngOnInit(): void {
    this.loginGroup.valueChanges.subscribe(form => {
      console.log(form)
    })

    
  }



  loginHandler() {
    this.afAuth.log(this.loginGroup.value)
  }
  
  onSubmit() {
    console.log(this.loginGroup.value)
  }

}

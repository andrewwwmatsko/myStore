import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authSevice: AuthService) { }

  userLoged:boolean = false
  isInnitialized: boolean=false

  ngOnInit(): void {
    this.authSevice.userData.subscribe(user=>{
      this.userLoged = user !== null ? true : false;
      this.isInnitialized=true
    })


  }
  logOut() {
    this.authSevice.logOut()
  }

}

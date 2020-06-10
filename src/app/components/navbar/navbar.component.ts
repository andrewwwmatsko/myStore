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
  ordersTotal: any;

  ngOnInit(): void {
    this.authSevice.userData.subscribe(user=>{
      this.userLoged = user !== null ? true : false;
      this.isInnitialized=true

      this.ordersTotal= Object.values(user.orderedItems).length > 0 ? Object.values(user.orderedItems).reduce((a:number,b:number) => {
        return a + b
      }): 0
    })


  }
  logOut() {
    this.authSevice.logOut()
  }

}

import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/shop/items.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalItems:any;

  constructor(private itemsService:ItemsService,
    private dbs:DataStorageService,
    private authService:AuthService) {
      this.authService.userData.subscribe(res => {
        let total=0;
        for (const item in res.orderedItems) {
          total+=res.orderedItems[item]
        }
        this.totalItems=total
      })
     }
     

  ngOnInit(): void {
    
  }

}

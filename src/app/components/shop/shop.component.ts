import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/shop/items.service'
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  modeView='list'
  items:any


  constructor(private itemsService:ItemsService,
    private dbs:DataStorageService,
    private authSevice: AuthService) {
      this.itemsService.getItems().subscribe(res =>{
        this.items=res
      })


   }

  ngOnInit(): void {
  }

  addToCartHandler(item) {
    this.dbs.addToCardDB(this.authSevice.userId,item)
  }



  changeView(mode) {
    this.modeView=mode
  }




}

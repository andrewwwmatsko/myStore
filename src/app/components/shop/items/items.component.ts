import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemsService } from '../../../services/shop/items.service'
import { Item } from '../../../models/item'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  modeView:string =""
  items:any
  
  @Input() item
  @Output() addItemToCartEvent= new EventEmitter()

  constructor(private itemsService:ItemsService) { }

  ngOnInit(): void {

  }
  addToCart(){
    this.addItemToCartEvent.emit(this.item)
  }

  
}

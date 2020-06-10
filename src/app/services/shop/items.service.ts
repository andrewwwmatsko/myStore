import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { DataStorageService } from '../data-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // items:Observable<Item[]>
  itemDb:any



  constructor( private afStore:AngularFirestore,
    private dbs:DataStorageService) { 
      this.itemDb =  this.dbs.getProductsFromDB()
    
  }

  getItems(){
    return this.dbs.getProductsFromDB()
  }

  }

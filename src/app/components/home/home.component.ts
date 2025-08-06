import { Component, Input } from '@angular/core';
import { CardHomeComponent } from "../card-home/card-home.component";
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardHomeComponent , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: object[] = [
    {name : "daisy pottery" , category:"Painted handcraft", description: "insbired pottery by daisy flowers and pastel colors" , img:"../../../assets/imgs/New folder/daisy pottery.jpg"},
    {name : "Macrame Mirror" ,category:"Home decor", description: "DIY Partial Macrame BOHO mirror" , img:"../../../assets/imgs/New folder/mirror.jpg"},
    {name : "Sunshine mug" , category:"Painted handcraft", description: "Painted sunshine mug inspired by summer season" , img:"../../../assets/imgs/New folder/sunshine mug.jpg"},
    {name : "Matriyel wall art" , category:"Home decor", description: "insbired wall art with boho style and wheat shape" , img:"../../../assets/imgs/New folder/tablu.jpg"},
    {name : "ring dish" , category:"Painted handcraft", description: "Painted Flowry ring dishes inspired bysummer season" , img:"../../../assets/imgs/New folder/rings.jpg"}
  ]
}

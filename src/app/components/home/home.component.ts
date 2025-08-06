import { Component, Input } from '@angular/core';
import { CardHomeComponent } from "../card-home/card-home.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardHomeComponent , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products : any[] = [
    {name : "daisy pottery" , category:"Painted handcraft", desc: "insbired pottery by daisy flowers and pastel colors" , img:"../../../assets/imgs/New folder/daisy pottery.jpg"},
    {name : "Macrame Mirror" ,category:"Home decor", desc: "DIY Partial Macrame BOHO mirror" , img:"../../../assets/imgs/New folder/mirror.jpg"},
    {name : "Sunshine mug" , category:"Painted handcraft", desc: "Painted sunshine mug inspired by summer season" , img:"../../../assets/imgs/New folder/sunshine mug.jpg"},
    {name : "Matriyel wall art" , category:"Home decor", desc: "insbired wall art with boho style and wheat shape" , img:"../../../assets/imgs/New folder/tablu.jpg"},
    {name : "ring dish" , category:"Painted handcraft", desc: "Painted Flowry ring dishes inspired bysummer season" , img:"../../../assets/imgs/New folder/rings.jpg"}
  ]
}

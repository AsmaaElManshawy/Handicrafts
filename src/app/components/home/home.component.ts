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
  products : IProduct[] = []
}

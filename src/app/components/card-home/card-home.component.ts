import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent {
  @Input() product!: IProduct;


}

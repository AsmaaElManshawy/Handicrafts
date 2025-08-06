import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isTransparent: boolean = false;
  
  isUser:boolean = true;
  isAdmin:boolean = false;

  userRole(status:number):void{
    if(status === 1){
      this.isUser = true;
      this.isAdmin = false;
    }else if(status === 2){
      this.isUser = false;
      this.isAdmin = true;
    }
  }
}

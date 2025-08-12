import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive ,Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  @Input() isTransparent: boolean = false;
  isUser:boolean = true;
  isAdmin:boolean = false;


  userRole(status:number):void{
    if(localStorage.getItem('role') === 'admin' && status === 1){
      this.isUser = true;
      this.isAdmin = false;
    localStorage.setItem('role','user');
    }else if(localStorage.getItem('role') === 'user' && status === 2){
      localStorage.setItem('role','admin')
      this.isUser = false;
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // safe to use localStorage
      if (localStorage.getItem('user') !== null) {
        localStorage.setItem('role', 'user');
        this.isUser = true
      }
    }
  }

}

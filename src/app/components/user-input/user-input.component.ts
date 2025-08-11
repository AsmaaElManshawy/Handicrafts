import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  username: string = '';
  users:any[]=[]

  constructor(private userService: UserService , private router:Router) {}

  checkUser () {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users=data;
      const foundUser  = this.users.find(user => user.userName.toLowerCase() === this.username.toLowerCase());
      if (foundUser ) {
        // User found, add to local storage
        localStorage.setItem('user', JSON.stringify(foundUser));
        this.username = foundUser.userName;
        alert('User found and logged in!');
      } else {
        // User not found, create a new user
        const newUser: any = {
        userId: this.users.length.toString(),
          userName: this.username,
          cart:{},
          sellingProducts: [],
      };
        this.userService.addUser(newUser).subscribe(() => {
          localStorage.setItem('user', JSON.stringify(newUser));
          this.username = newUser.userName;
          alert('New user created and logged in!');
        });
      }
    });
    this.router.navigate(['/home']);
  }


}

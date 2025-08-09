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
      const foundUser  = this.users.find(user => user.userName === this.username);
      if (foundUser ) {
        // User found, add to local storage
        localStorage.setItem('token', foundUser.token);
        localStorage.setItem('username', foundUser.userName);
        this.username = foundUser.userName;
        alert('User found and logged in!');
      } else {
        // User not found, create a new user
        const newUser: any = { userName: this.username, token: this.generateToken() };
        this.userService.addUser(newUser).subscribe(() => {
          localStorage.setItem('token', newUser.token);
          localStorage.setItem('username', newUser.userName);
          this.username = newUser.userName;
          alert('New user created and logged in!');
        });
      }
    });
    this.router.navigate(['/home']);
  }

  generateToken(): string {
    const token = Math.random().toString(36).substring(2);
    alert('Token generated: ' + token);
    return token;
  }
  
}

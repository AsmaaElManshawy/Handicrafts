import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive ,Router} from '@angular/router';
import { IUser } from '../../interfaces/IUser/iuser';
import { UserService } from '../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  navigateToUserInput(): void {
    this.router.navigate(['/userInput']);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // safe to use localStorage
      localStorage.setItem('role', 'user');
    }
  }

// user logic

  private readonly Uservice = inject(UserService)
  usersList:any;

  myName = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
  })

  get getName(){
    return this.myName.controls['name']
  }

  onSubmit(form:any,event: Event){
    event.preventDefault();
    console.log('submit form');
    console.log(form);
    if(form.valid){
      console.log('form valid');
      console.log(form.value.name)
      this.getUserByName(form.value.name);
    } else {
      console.log('Form Invalid');
    }
  }

  getAllUsers():void{
    this.Uservice.getAllUsers().subscribe({
      next:(res)=>{
        console.log('User List: get all users')
        this.usersList = res;
        console.log(this.usersList)
      },
      error:(err) => {
        console.log(err)
      },
    })
  }

  getUserByName(name:string){
    console.log('User List: get user by name')
    let user  = this.usersList.find((u:IUser)=> u.userName.toLowerCase() == name.toLowerCase());
    if ( user == undefined) {
      user = {
        userId: this.usersList.length.toString(),
          userName: name,
          cart: [],
          sellingProducts: [],
      }
      this.addNewUser(user);
      let newUser  = this.usersList.find((u:IUser)=> u.userName.toLowerCase() == name.toLowerCase());
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  addNewUser(user:IUser): void {
    this.Uservice.addUser(user).subscribe({
      next: (res) => {
        console.log('User added successfully');
        this.getAllUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}

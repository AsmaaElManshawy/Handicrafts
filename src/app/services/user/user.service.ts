import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUser } from '../../interfaces/IUser/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //  for home page
  //  for managing users
  private readonly url = `${environment.baseUrl}/user`;
  constructor(private readonly http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.url);
  }

  getUserById( userId: string) {
    return this.http.get(`${this.url}/${userId}`);
  }

  addUser(newUser: IUser) {
    // add a new user
    return this.http.post(this.url, newUser);
  }

  editUser(user: IUser, userId: string) {
      return this.http.patch(
        `${this.url}/${userId}`,
        user
      );
    }

  deleteUser(id: string) {
    // remove a user
    return this.http.delete(`${this.url}/${id}`);
  }

  editUsersId(users: IUser[]) {
    return this.http.patch(
      `${this.url}`,
      users
    );
  }
}

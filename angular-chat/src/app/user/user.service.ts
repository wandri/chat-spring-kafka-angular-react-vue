import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private server = environment.server;

  constructor(private http: HttpClient) {
  }

  getUser(name: string): Promise<User> {
    return this.http.post<User>(`${this.server}/users`, {name}).toPromise();
  }
}

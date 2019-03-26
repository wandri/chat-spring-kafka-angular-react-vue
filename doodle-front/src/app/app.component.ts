import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// TODO move interface
export interface User {
  name: string;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  userName = new FormControl('');

  user: User;

  constructor(private http: HttpClient) {
    console.log(this.user)
  }

  activateUser() {
    if ( this.userName.value && this.userName.value !== '' ) {
      this.http.post<User>('http://localhost:8000/users', {name: this.userName.value}).toPromise()
        .then(user => this.user = user);
    }
  }
}

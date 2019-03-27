import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from './user/user.service';
import { User } from './user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  userName = new FormControl('');

  user: User;

  constructor(private userService: UserService) {
  }

  activateUser() {
    if ( this.userName.value && this.userName.value !== '' ) {
      this.userService.getUser(this.userName.value)
        .then(user => this.user = user);
    }
  }
}

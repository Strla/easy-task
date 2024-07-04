import { Component, computed, input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input.required<User>();
  imagePath = computed(() => `assets/users/${this.user().avatar}`);

  onSelectUser() {}
}

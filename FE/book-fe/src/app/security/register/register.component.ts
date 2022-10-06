import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../../model/User';
import {SecurityService} from '../../service/security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: this.fb.group({
      password: [],
      confirmPassword: []
    }),
    name: new FormControl(),
    birthDay: new FormControl(),
  });

  constructor(private fb: FormBuilder, private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [],
      username: [],
      password: this.fb.group({
        password: [],
        confirmPassword: []
      }),
      name: [],
      birthDay: [],
    });
  }

  save() {
    let user: User;
    user = this.formLogin.value;
    user.password = this.formLogin.get('password').get('password').value;
    console.log(user);
    this.securityService.save(user).subscribe();
  }
}

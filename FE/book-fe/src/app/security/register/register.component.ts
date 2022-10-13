import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../../model/User';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../service/share.service';
import {CookieService} from 'ngx-cookie-service';
import {CartService} from '../../service/cart.service';
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
  user: User = {};
  private returnUrl: string;

  constructor(private fb: FormBuilder,
              private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private shareService: ShareService,
              private cookieService: CookieService,
              private cartService: CartService,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
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
    this.authService.register(user).subscribe(data => {
      this.tokenStorageService.saveTokenSession(data.token);
      this.tokenStorageService.saveUserSession(data);
      this.authService.isLoggedIn = true;
      this.formLogin.reset();
      this.securityService.findByUser(user.username).subscribe(value => {
        this.user = value;
        this.securityService.changeUser(this.user);
      });
      this.router.navigateByUrl(this.returnUrl);
      this.shareService.sendClickEvent();
    }, err => {
      this.authService.isLoggedIn = false;
    });
  }
}

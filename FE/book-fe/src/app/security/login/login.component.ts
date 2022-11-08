import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../service/token-storage.service';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {ShareService} from '../../service/share.service';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../model/cart';
import {User} from '../../model/User';
import {SecurityService} from '../../service/security.service';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  roles: string[] = [];
  username: string;
  returnUrl: string;
  cart: Cart[] = [];
  user: User = {};
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;

  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private shareService: ShareService,
              private cookieService: CookieService,
              private cartService: CartService,
              private securityService: SecurityService,
              private formBuilder: FormBuilder,
              private readonly socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    this.socialAuthService.signOut();
    this.cookieService.deleteAll();
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
      this.isLoggedin = user != null;
    }, (error) => {
      console.log(error);
    });
    this.securityService.currentUser.subscribe(message => this.user = message);
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );

    if (this.tokenStorageService.getToken()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(data => {
      this.tokenStorageService.saveTokenLocal(data.token);
      this.tokenStorageService.saveUserLocal(data);
      this.authService.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      this.securityService.findByUser(this.username).subscribe(value => {
        this.user = value;
        this.securityService.changeUser(this.user);
      });
      this.roles = this.tokenStorageService.getUser().roles;
      this.formGroup.reset();
      this.cartService.getCart(this.username).subscribe(value => {
        this.cart = value;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.router.navigateByUrl(this.returnUrl);
        this.toastr.success('Đăng nhập thành công', 'Đăng nhập: ', {
          timeOut: 3000,
          extendedTimeOut: 1500
        });
        this.shareService.sendClickEvent();
      });
    }, err => {
      this.authService.isLoggedIn = false;
      this.toastr.error('Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt', 'Đăng nhập thất bại: ', {
        timeOut: 3000,
        extendedTimeOut: 1500
      });
    });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}





import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import {SecurityService} from '../../service/security.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: User = {};

  constructor(private tokenStorageService: TokenStorageService,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.securityService.currentUser.subscribe(message => this.user = message);
  }

}

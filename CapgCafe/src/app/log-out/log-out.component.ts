import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private service:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.service.logout();
    this.router.navigate(['home']);
    alert("Logged Out Successfully...")
  }

}

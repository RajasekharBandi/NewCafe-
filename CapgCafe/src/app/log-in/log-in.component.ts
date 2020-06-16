import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../shared/employee';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  tempEmp: Employee;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthenticationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      empId: ['', Validators.required],
      empPassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get data() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.tempEmp = new Employee(this.data.empId.value, "", "", this.data.empPassword.value, "", "", "");
    var temp = this.service.loginEmp(this.tempEmp);
    temp.subscribe((data) => {
      localStorage.setItem('empId', data.empId);
      localStorage.setItem('empName', data.empName);
      localStorage.setItem('empEmail', data.empEmail);
      localStorage.setItem('empMagicWord', data.empMagicWord);
      localStorage.setItem('empType', data.empType);

      if (data.empId == this.data.empId.value && data.empPassword == this.data.empPassword.value) {
        this.service.sendToken(data.empId.toString());
        this.loading = false;

        if (data.empType == "ADMIN") {
          this.router.navigate(['adminDesk'])
        }
        else {
          this.router.navigate(['home'])
        }
      }
      else {
        alert("Login denied for id " + this.data.empId.value);
        this.router.navigate(['home']);
      }
    }
    )
  }
}
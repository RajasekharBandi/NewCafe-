import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Employee } from '../shared/employee';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    tempEmp:Employee;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private service:AuthenticationService   
  ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            empId: ['', Validators.required],
            empMagicWord: ['', Validators.required]
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

        this.tempEmp = new Employee(this.data.empId.value,"","","","",this.data.empMagicWord.value,"");
        var temp = this.service.forgetPassword(this.tempEmp);
        temp.subscribe((data)=>
    {
       localStorage.setItem('empId',data.empId);
       localStorage.setItem('empName',data.empName);
       localStorage.setItem('empEmail',data.empEmail);
       localStorage.setItem('empType',data.empType);

       if(data.empId==this.data.empId.value && data.empMagicWord==this.data.empMagicWord.value)
      {
       alert("Password for Employee id "+data.empId + " is : " +data.empPassword );
      this.router.navigate(['login'])}
      else
      {alert("Invalid Credentials for Employee Id : "+this.data.empId.value);}
      this.router.navigate(['home']);
     })
    }

}

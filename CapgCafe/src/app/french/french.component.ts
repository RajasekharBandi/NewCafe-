import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-french',
  templateUrl: './french.component.html',
  styleUrls: ['./french.component.css']
})
export class FrenchComponent implements OnInit { form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService
  ) { }


  ngOnInit() {
   
    this.form = this.formBuilder.group({
      menu1: [''],
      menu2: [''],
      menu3: [''],
      menu4: [''],
      menu5: [''],
      menu6: ['']
    });
  }
  get f() { return this.form.controls; }



  onSubmit() {
    console.log(this.form.value.menu1);
    console.log(this.form.value.menu2);
    console.log(this.form.value.menu3);
    console.log(this.form.value.menu4);
    console.log(this.form.value.menu5);
    console.log(this.form.value.menu6);

    
    this.submitted = true;
    if (this.form.value.menu1 == this.form.value.menu2 == this.form.value.menu3 == this.form.value.menu4 == this.form.value.menu5 == this.form.value.menu6) {
      if (this.form.value.menu1 == 0) {
        alert("You haven't select any dish!!!")
      }
      else {
        if (this.form.value.menu1 < 0 || this.form.value.menu2 < 0 || this.form.value.menu3 < 0 || this.form.value.menu4 < 0 || this.form.value.menu5 < 0 || this.form.value.menu6 < 0) {
          alert("Order can't be Negative")
        }
        else {
          alert("Good Choice!!!");
        }

      }
    }
   
  }


}

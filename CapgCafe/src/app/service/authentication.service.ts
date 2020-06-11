import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient, private router:Router) { }


  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    // this.router.navigate(['login']);
  }


   //Code for login the user
   loginEmp(employee: Employee): Observable<any> 
   {
     return this.http.get('http://localhost:2048/cafe/login/' + employee.empId +"/"+employee.empPassword);
   }
 
   //Code for registering the user
   registerEmp(data: Employee): Observable<any> 
   {
      return this.http.post("http://localhost:2048/cafe/register", data);
   }

   //Code for checking existing user
   existingUserCheck(data: Employee):Observable<any>
   {
      return this.http.post("http://localhost:2048/cafe/userCheck",data);
   }

   //Code for forget Password of  the user
   forgetPassword(employee: Employee): Observable<any> 
   {
     return this.http.get('http://localhost:2048/cafe/forgetPassword/' + employee.empId +"/"+employee.empMagicWord);
   }
    
}


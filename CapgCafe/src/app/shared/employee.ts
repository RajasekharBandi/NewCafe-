export class Employee {
  empId: number;
  empName: string;
  empEmail:string;
  empPassword: string;
  empMobileNo: string;
  empMagicWord : string;
  empType : string;
  

  constructor(empId: number,
     empName: string,
     empEmail: string,
     empPassword: string,
     empMobileNo: string,
     empMagicWord : string,
     empType : string
   ) {
     this.empId = empId;
     this.empName =empName;
     this.empEmail = empEmail;
     this.empPassword =empPassword;
     this.empMobileNo = empMobileNo;
     this.empMagicWord = empMagicWord;
     this.empType = empType;
 }

}
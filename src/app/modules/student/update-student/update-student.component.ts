import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Routes } from '@angular/router';
import { SiblingInformationService } from 'src/app/services/siblingInformationService/sibling-information.service';
import { StudentService } from 'src/app/services/studentService/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})

export class UpdateStudentComponent implements OnInit {

  public student: FormGroup;
  FMExpired: boolean;
  isRteStudent: boolean;
  isSiblings: boolean;

  class: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateStudentComponent>, private service: StudentService,
    private router: Router,private sibInfoSer:SiblingInformationService,public _snackBar:MatSnackBar) {

    this.student = this.formBuilder.group({
      registrationId: new FormControl('', []),
      dateOfAdmission: new FormControl('', []),
      samagraId: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      fatherMotherExpired: new FormControl('', [Validators.required]).setValue(this.data.fatherMotherExpired),
      fatherName: new FormControl('', []),
      motherName: new FormControl('', []),
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}'), Validators.maxLength(10)]],
      presentAddress: new FormControl('', []),
      permanentAddress: new FormControl('', []),
      classToJoin: new FormControl('classToJoin', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', []),
      marksOfIdentification: new FormControl('', []),
      religion: new FormControl('', []),
      caste: new FormControl('', []),
      castId: new FormControl('', []),
      aadharNumber: new FormControl('', [Validators.minLength(12), Validators.maxLength(12)]),
      bankAccountNumber: new FormControl('', []),
      ifscCode: new FormControl('', []),
      childHandicapped: new FormControl('', []),
      siblings: new FormControl('', []),
      rteStudent: new FormControl('', [Validators.required]),
      siblingInformation: this.formBuilder.array([
        this.formBuilder.group({
          name: new FormControl('',[Validators.required]),
          age: new FormControl('',[Validators.required])
        })
      ]),


      /* admissionFee: new FormControl(' ',[]),
       examFee: new FormControl(' ',[]),
       schoolFee: new FormControl(' ',[]),
       busFee: new FormControl(' ',[]),
       totalFee: new FormControl('totalFee',[]),
       admissionFeePaid: new FormControl('0',[]),
       admissionFeeDue: new FormControl('admissionFeeDue',[]),
       busFeePaid: new FormControl('0',[]),
       busFeeDue: new FormControl('busFeeDue',[]),
       examFeePaid: new FormControl('0',[]),
       examFeeDue: new FormControl('examFeeDue',[]),*/
    });


  }

  ngOnInit(): void {
    this.student.patchValue({
      registrationId: this.data.registrationId,
      dateOfAdmission: this.data.dateOfAdmission,
      samagraId: this.data.samagraId,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      fatherMotherExpired: this.data.fatherMotherExpired,
      fatherName: this.data.fatherName,
      motherName: this.data.motherName,
      mobileNumber: this.data.mobileNumber,
      presentAddress: this.data.presentAddress,
      permanentAddress: this.data.permanentAddress,
      classToJoin: this.data.classToJoin,
      gender: this.data.gender,
      dateOfBirth: this.data.dateOfBirth,
      marksOfIdentification: this.data.marksOfIdentification,
      religion: this.data.religion,
      caste: this.data.caste,
      castId: this.data.castId,
      aadharNumber: this.data.aadharNumber,
      bankAccountNumber: this.data.bankAccountNumber,
      ifscCode: this.data.ifscCode,
      childHandicapped: this.data.childHandicapped,
      siblings: this.data.siblings,
      rteStudent: this.data.rteStudent,
      siblingInformation: this.data.siblingInformation,



      /*  admissionFee: this.data.admissionFee,
        examFee: this.data.examFee,
        schoolFee: this.data.schoolFee,
        busFee: this.data.busFee,
        totalFee: this.data.totalFee,
        admissionFeePaid: this.data.admissionFeePaid,
        admissionFeeDue: this.data.admissionFeeDue,
        busFeePaid: this.data.busFeePaid,
        busFeeDue: this.data.busFeeDue,
        examFeePaid: this.data.examFeePaid,
        examFeeDue: this.data.examFeeDue,*/
    });

    this.FMExpired = this.data.fatherMotherExpired;
    this.isRteStudent = this.data.rteStudent;
    this.isSiblings = this.data.siblings;
  this.student.setControl('siblingInformation',this.setExistsSiblingInformation(this.data.siblingInformation))

  }

  setExistsSiblingInformation(siblingInformationSets:any):FormArray{
      const formArray = new FormArray([]);
      siblingInformationSets.forEach(s=>{
        formArray.push( this.formBuilder.group({
          id:s.id,
          name:new FormControl(s.name, [Validators.required]),
          age: new FormControl(s.age, [Validators.required]) ,
        }));
      });
      return formArray;
  }



  fatherMotherExpired(val: boolean): void {
    if (val == false) {
      this.student.patchValue({
        fatherName: this.data.fatherName,
        motherName: this.data.motherName
      });
    }
    if (val == true) {
      this.student.patchValue({
        fatherName: '',
        motherName: ''
      });
    }
    this.FMExpired = val;
  }

  rteStudent(val: boolean): void {
    this.student.patchValue({
      classToJoin: '',
    });
    this.isRteStudent = val;
  }

  siblings(val: boolean): void {
    if (val == false) {
      // (this.student.get("siblingInformation") as FormArray).clear();
    }
    this.isSiblings = val;
  }


  update(student) {
    this.service.updateStudent(student.registrationId, student).subscribe((data) => {
      this.dialogRef.close('success');
    }, (error) => {
      console.log(error);
      this.dialogRef.close('failure');
    })
  }


  updateSibInfo(info) {
    this.sibInfoSer.updateSibInfo(info.id,info).subscribe((data) => {
      this.dialogRef.close('success');
    }, (error) => {
      console.log(error);
      this.dialogRef.close('failure');
    })
  }

  deleteSibInfo(i:number,info) {
    this.sibInfoSer.delete(info.id).subscribe((data) => {
      this.removeSibling(i);
      this.openSnackBar("successfully");
    }, (error) => {
      console.log(error);
      this.openSnackBar("failure");
    });
  }

  openSnackBar(message) {
    this._snackBar.open('Sibling deleted '+ message, '',{
      duration: 3000, 
      panelClass: [message]
    });
  }


  //----- add the Sibling Information--------------------//
  siblingInformation(): FormArray {
    return this.student.get("siblingInformation") as FormArray
  }

  newSibling(): FormGroup {
    return this.formBuilder.group({
      id : null,
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }

  addSibling() {
    this.siblingInformation().push(this.newSibling());
  }

  removeSibling(i: number) {
    this.siblingInformation().removeAt(i);
  }

}

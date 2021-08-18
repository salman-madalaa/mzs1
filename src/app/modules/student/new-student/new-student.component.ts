import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorMessage,ErrorMessageComponent } from 'src/app/conformDialogBoxes/success/error-message/error-message.component';
import { Student } from 'src/app/model/Student';
import { StudentService } from 'src/app/services/studentService/student.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  public student: FormGroup;
  dataSource: Student[];
  selected = '';
  FMExpired = true;
  isRteStudent = false;
  isSiblings = false;
  myFormGroup: any;

  constructor(private router: Router, private service: StudentService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<NewStudentComponent>,public dialog: MatDialog) {

    this.student = this.formBuilder.group({
      registrationId: new FormControl('', []),
      dateOfAdmission: new FormControl('', []),
      samagraId: new FormControl('', []),
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      fatherName: new FormControl('', []),
      motherName: new FormControl('', []),
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}'), Validators.maxLength(10)]],
      presentAddress: new FormControl('', []),
      permanentAddress: new FormControl('', []),
      classToJoin: new FormControl('', []),
      gender: new FormControl('', []),
      dateOfBirth: new FormControl('', []),
      marksOfIdentification: new FormControl('', []),
      religion: new FormControl('', []),
      caste: new FormControl('', []),
      castId: new FormControl('', []),
      aadharNumber: new FormControl('', [Validators.minLength(12), Validators.maxLength(12)]),
      bankAccountNumber: new FormControl('', []),
      ifscCode: new FormControl('', []),
      childHandicapped: new FormControl('', []),
      fatherMotherExpired: new FormControl('', [Validators.required]),
      siblings: new FormControl('', [Validators.required]),
      rteStudent: new FormControl('', [Validators.required]),
      siblingInformation: this.formBuilder.array([]),
      // admissionFee: new FormControl('0',[]),
      // examFee: new FormControl('0',[]),
      // schoolFee: new FormControl('0',[]),
      // busFee: new FormControl('0',[]),
    });

  }


  ngOnInit(): void {
  }

  fatherMotherExpired(val: boolean): void {
    if (val) {
      this.student.patchValue({
        fatherName: '',
        motherName: ''
      });
    }
    this.FMExpired = val;
  }

  rteStudent(val: boolean): void {
    if (val) {
      this.student.patchValue({
        classToJoin: '',
      });
    }
    this.isRteStudent = val;
  }

  siblings(val: boolean): void {
    if (val == false) {
      (this.student.get("siblingInformation") as FormArray).clear();
    }
    this.isSiblings = val;
  }

  create(student) {
    let body = JSON.stringify(student);
    this.service.Create(student).subscribe((data) => {
      this.dialogRef.close('success');
    }, (error) => {
      console.log(error);
      this.dialog.open(ErrorMessageComponent, { width: "600px",panelClass: 'dialog-container-custom-failure', data: new ErrorMessage("Student creation Failure") });
     // this.dialogRef.close('failure');
    })
  }


 //----- add the Sibling Information--------------------//
  siblingInformation(): FormArray {
    return this.student.get("siblingInformation") as FormArray
  }

  newSibling(): FormGroup {
    return this.formBuilder.group({
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

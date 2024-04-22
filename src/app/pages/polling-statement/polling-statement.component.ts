// polling-statement.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-polling-statement',
  templateUrl: './polling-statement.component.html',
  styleUrls: ['./polling-statement.component.css']
})
export class PollingStatementComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      ballotsIssued: ['', Validators.required],
      serialNumberRange: ['', Validators.required],
      rangeHundred: ['', Validators.required],
      range50: ['', Validators.required],
      range25: ['', Validators.required],
      range10: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.markFormGroupTouched(this.myForm);
      return;
    }
    // Handle form submission
    console.log('Form submitted:', this.myForm.value);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-elections-details',
  templateUrl: './elections-details.component.html',
  styleUrls: ['./elections-details.component.css']
})
export class ElectionsDetailsComponent implements OnInit {
  candidatesForm!: FormGroup;
  candidates: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.createForm();
  }

  createForm() {
      this.candidatesForm = this.fb.group({
          candidatesArray: this.fb.array([]) // You can initialize with any existing data here
      });
  }

  addCandidate() {
      const candidateGroup = this.fb.group({
          name: ['', Validators.required],
          party: ['', Validators.required]
      });
      this.candidates.push(candidateGroup);
  }

  deleteCandidate(index: number) {
      this.candidates.splice(index, 1);
  }
}

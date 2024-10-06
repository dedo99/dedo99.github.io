// src/app/spinner/spinner.component.ts
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading = false;

  constructor(private spinner_Service: SpinnerService) { }

  ngOnInit(): void {
    this.spinner_Service.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
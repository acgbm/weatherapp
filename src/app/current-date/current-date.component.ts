import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-date',
  templateUrl: './current-date.component.html',
  styleUrls: ['./current-date.component.css']
})
export class CurrentDateComponent implements OnInit {
  Date1: Date = new Date();
  Date2: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.Date1 = new Date();
    }, 1000);

    setInterval(() => {
      this.Date2 = new Date();
    }, 60000);
  }
}
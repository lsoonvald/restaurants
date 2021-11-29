import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-daypicker',
  templateUrl: './daypicker.component.html',
  styleUrls: ['./daypicker.component.scss']
})
export class DaypickerComponent implements OnInit {
  @Input() date: Date | undefined;
  @Output() dateChange = new EventEmitter<Date>();
  dateOptions: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initOptions();
  }

  setDate(date: Date): void {
    this.date = date;
    this.dateChange.emit(this.date);
  }

  private initOptions(): void {
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      this.dateOptions.push(date);
    }
  }

}

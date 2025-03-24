import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnInit {
  @Input() count: number = 0;
  @Input() maxLimit: number = 99;
  @Output() countChange = new EventEmitter<number>();
  public displayCount: string = '00';

  ngOnInit(): void {
    this.formatDisplayCount();
  }
  onDecrease() {
    if (this.count < 1) {
      return;
    }
    this.count--;
    this.formatDisplayCount();
    this.countChange.emit(this.count);
  }
  onIncrease() {
    if (this.count >= this.maxLimit) {
      return;
    }
    this.count++;
    this.formatDisplayCount();
    this.countChange.emit(this.count);
  }

  private formatDisplayCount() {
    if (this.count < 10) {
      this.displayCount = `0${this.count}`;
    } else {
      this.displayCount = this.count.toString();
    }
  }
}

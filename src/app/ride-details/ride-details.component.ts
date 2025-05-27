import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css'],
})
export class RideDetailsComponent {
  @Input() ride: any;
  @Output() cancelRide = new EventEmitter<boolean>();

  bookingDone: boolean = false;
  bookingId: string = '';

  bookRide() {
    this.bookingDone = true;
    this.bookingId = '101'; // Mock booking ID
  }

  cancelBookedRide() {
    this.bookingDone = false;
    this.bookingId = '';
    this.cancelRide.emit(true);
  }
}


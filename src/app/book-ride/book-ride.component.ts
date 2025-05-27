import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css'],
})
export class BookRideComponent implements OnInit {
  rides: any[] = [];
  filteredRides: any[] = [];
  selectedRide: any = null;
  successMessage: string = '';
  errorMessage: string = '';
  currentUser: string = 'John Doe'; // Replace with actual logged-in user details.

  constructor(private restService: RestService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.restService.getRides().subscribe((data) => {
      this.rides = data;
      this.filteredRides = [...this.rides]; // Default to show all rides
    });
  }

  filterRides(criteria: string): void {
    if (criteria === 'all') {
      this.filteredRides = [...this.rides];
    } else if (criteria === 'toOffice') {
      this.filteredRides = this.rides.filter((ride) =>
        ride.endPoint.toLowerCase().includes('office')
      );
    } else if (criteria === 'fromOffice') {
      this.filteredRides = this.rides.filter((ride) =>
        ride.startPoint.toLowerCase().includes('office')
      );
    } else {
      this.filteredRides = this.rides.filter(
        (ride) =>
          !ride.startPoint.toLowerCase().includes('office') &&
          !ride.endPoint.toLowerCase().includes('office')
      );
    }
  }

  bookRide(ride: any): void {
    if (ride.owner === this.currentUser) {
      this.errorMessage = 'Cannot book your own ride!';
      this.successMessage = '';
      return;
    }

    if (ride.seatsAvailable > 0) {
      ride.seatsAvailable--;
      this.successMessage = `Booking done. Your booking id - ${Math.floor(
        Math.random() * 1000
      )}`;
      this.errorMessage = '';
      this.selectedRide = ride; // Track the selected ride.
    } else {
      this.errorMessage = 'No seats available!';
      this.successMessage = '';
    }
  }

  cancelRide(): void {
    if (this.selectedRide) {
      this.selectedRide.seatsAvailable++;
      this.successMessage = 'Your booking has been canceled successfully.';
      this.errorMessage = '';
      this.selectedRide = null;
    }
  }

  offerRide(): void {
    this.router.navigate(['/offer-ride']); // Navigate to OfferRideComponent
  }
}


/*
without router

import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css'],
})
export class BookRideComponent implements OnInit {
  rides: any[] = [];
  filteredRides: any[] = [];
  selectedRide: any = null;
  successMessage: string = '';
  errorMessage: string = '';
  currentUser: string = 'John Doe'; 

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getRides().subscribe((data) => {
      this.rides = data;
      this.filteredRides = [...this.rides]; 
    });
  }

  filterRides(criteria: string): void {
    if (criteria === 'all') {
      this.filteredRides = [...this.rides];
    } else if (criteria === 'toOffice') {
      this.filteredRides = this.rides.filter((ride) =>
        ride.endPoint.toLowerCase().includes('office')
      );
    } else if (criteria === 'fromOffice') {
      this.filteredRides = this.rides.filter((ride) =>
        ride.startPoint.toLowerCase().includes('office')
      );
    } else {
      this.filteredRides = this.rides.filter(
        (ride) =>
          !ride.startPoint.toLowerCase().includes('office') &&
          !ride.endPoint.toLowerCase().includes('office')
      );
    }
  }

  bookRide(ride: any): void {
    if (ride.owner === this.currentUser) {
      this.errorMessage = 'Cannot book your own ride!';
      this.successMessage = '';
      return;
    }

    if (ride.seatsAvailable > 0) {
      ride.seatsAvailable--;
      this.successMessage = `Booking done. Your booking id - ${Math.floor(
        Math.random() * 1000
      )}`;
      this.errorMessage = '';
      this.selectedRide = ride;
    } else {
      this.errorMessage = 'No seats available!';
      this.successMessage = '';
    }
  }

  cancelRide(): void {
    if (this.selectedRide) {
      this.selectedRide.seatsAvailable++;
      this.successMessage = 'Your booking has been canceled successfully.';
      this.errorMessage = '';
      this.selectedRide = null;
    }
  }
}
*/

/*
import { Component , OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent implements OnInit{
  rides: any[] = [];
  filteredRides: any[] = [];

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getRides().subscribe((data) => {
      this.rides = data;
      this.filteredRides = [...this.rides]; // Default to show all rides
    });
  }

  filterRides(criteria: string): void {
    if (criteria === 'all') {
      this.filteredRides = [...this.rides];
    } else if (criteria === 'toOffice') {
      this.filteredRides = this.rides.filter((ride) =>
        ride.endPoint.toLowerCase().includes('office')
      );
    } else if (criteria === 'fromOffice') {
      this.filteredRides = this.rides.filter((ride) =>
        ride.startPoint.toLowerCase().includes('office')
      );
    } else {
      this.filteredRides = this.rides.filter(
        (ride) =>
          !ride.startPoint.toLowerCase().includes('office') &&
          !ride.endPoint.toLowerCase().includes('office')
      );
    }
  }
*/

  /*
  showRides: boolean = false;
  currentFilter: string = '';
  
  
  rides = [
    { startPoint: 'Vanrose Junction', endPoint: 'Office', seatsAvailable: 3 ,type: 'To Office'},
    { startPoint: 'PTP', endPoint: 'Office', seatsAvailable: 2 ,type: 'To Office'},
    { startPoint: 'Office', endPoint: 'East-Fort', seatsAvailable: 7 ,type: 'From Office' },
    { startPoint: 'Office', endPoint: 'Central Mall', seatsAvailable: 5 , type: 'From Office' }
  ];

  
// these are before forms
  toggleRides() {
    this.showRides = !this.showRides;
    if (!this.showRides) this.currentFilter = ''; 
  }

  filterRides(filter: string) {
    this.currentFilter = filter;
  }
//
  filterBy: string = '';
  selectedRide: any = null;
  isRideBooked: boolean = false;

  showAllRides() {
    this.filterBy = '';
  }

  filterRides(criteria: string) {
    this.filterBy = criteria;
  }

  selectRide(ride: any) {
    this.selectedRide = ride;
  }

  handleCancelRide(event: boolean) {
    if (event) {
      this.selectedRide = null;
      this.isRideBooked = false;
    }
  }
  */




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {
  offerRideForm!: FormGroup; // Declare the form group
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with controls and validators
    this.offerRideForm = this.fb.group({
      name: ['', Validators.required],
      startLocation: ['', Validators.required],
      destination: ['', Validators.required],
      car: ['', Validators.required],
      seatsAvailable: [
        '',
        [Validators.required, Validators.min(1), Validators.max(7)]
      ],
    });
  }

  // Getter methods for form controls
  get name() {
    return this.offerRideForm.get('name');
  }
  get startLocation() {
    return this.offerRideForm.get('startLocation');
  }
  get destination() {
    return this.offerRideForm.get('destination');
  }
  get car() {
    return this.offerRideForm.get('car');
  }
  get seatsAvailable() {
    return this.offerRideForm.get('seatsAvailable');
  }

  onSubmit(): void {
    if (this.offerRideForm.valid) {
      const newRide = this.offerRideForm.value;
      this.restService.addRide(newRide); // Add the new ride
      this.successMessage = 'Ride successfully added!';
      this.offerRideForm.reset(); // Reset the form
      console.log('New ride:', newRide);
    }
  }

  goBack(): void {
    this.router.navigate(['/book-ride']); // Navigate back to BookRideComponent
  }
}




/*
without router
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {
  offerRideForm!: FormGroup; // Declare the form group
  successMessage: string = '';
  constructor(private fb: FormBuilder, private restService: RestService) {}

  ngOnInit(): void {
    // Initialize the form with controls and validators
    this.offerRideForm = this.fb.group({
      name: ['', Validators.required],
      startLocation: ['', Validators.required],
      destination: ['', Validators.required],
      car: ['', Validators.required],
      seatsAvailable: [
        '',
        [Validators.required, Validators.min(1), Validators.max(7)]
      ],
    });
  }

 // Getter methods for form controls
  get name() {
    return this.offerRideForm.get('name');
  }
  get startLocation() {
    return this.offerRideForm.get('startLocation');
  }
  get destination() {
    return this.offerRideForm.get('destination');
  }
  get car() {
    return this.offerRideForm.get('car');
  }
  get seatsAvailable() {
    return this.offerRideForm.get('seatsAvailable');
  }
  

  
    onSubmit(): void {
      if (this.offerRideForm.valid) {
        const newRide = this.offerRideForm.value;
        this.restService.addRide(newRide); // Add the new ride
        this.successMessage = 'Ride successfully added!';
        this.offerRideForm.reset(); // Reset the form
        console.log('New ride:', newRide);
      }
    }
    
    
    
 

  goBack(): void {
    console.log('Go Back clicked');
   
  }
    
}
*/
/*
    if (this.offerRideForm.valid) {
      console.log('Form Submitted:', this.offerRideForm.value);
    }
      */
/*
import { Component } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css'],
})
export class OfferRideComponent {
  name: string = '';
  startPoint: string = '';
  destination: string = '';
  car: string = '';
  seatsAvailable: number | null = null;
  successMessage: string = '';

  constructor(private restService: RestService) {}

  onSubmit(): void {
    if (this.name && this.startPoint && this.destination && this.car && this.seatsAvailable !== null) {
      const newRide = {
        name: this.name,
        startPoint: this.startPoint,
        destination: this.destination,
        car: this.car,
        seatsAvailable: this.seatsAvailable,
      };

      this.restService.addRide(newRide);
      this.successMessage = 'Added Successfully!';
      this.clearForm();
    } else {
      this.successMessage = 'Please fill all the fields!';
    }
  }

  clearForm(): void {
    this.name = '';
    this.startPoint = '';
    this.destination = '';
    this.car = '';
    this.seatsAvailable = null;
  }
}
*/









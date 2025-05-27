/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private rides: any[] = [
    { startPoint: 'Electronics City', endPoint: 'Whitefield', seatsAvailable: 3 },
    { startPoint: 'Hebbal', endPoint: 'Koramangala', seatsAvailable: 2 },
  ];

  constructor() {}

  // Fetch all rides
  getRides(): any[] {
    return this.rides;
  }

  // Add a new ride
  addRide(ride: any): void {
    this.rides.push(ride);
  }
}
*/





import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  private ridesUrl = 'assets/rides.json';
  private usersUrl = 'assets/users.json';
  private rides: any[] = []; // Local rides cache

  constructor(private http: HttpClient) {
     // Load rides on service initialization
     this.loadRides();
  }

  // Fetch rides data
  getRides(): Observable<any[]> {
    return this.http.get<any[]>(this.ridesUrl);
  }

  // Fetch users data
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  // Load rides into the local cache
  private loadRides(): void {
    this.http.get<any[]>(this.ridesUrl).subscribe((data) => {
      this.rides = data;
    });
  }

  // Add a new ride to the local cache
  addRide(newRide: any): void {
    this.rides.push(newRide);
    console.log('New ride added:', newRide);
    // Simulate saving to a backend or show how you'd send the data
    // this.http.post('/api/rides', newRide).subscribe();
  }
  
}

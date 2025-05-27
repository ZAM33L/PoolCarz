import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilter',
})
export class RideFilterPipe implements PipeTransform {
  transform(rides: any[], filterBy: string): any[] {
    if (!rides || !filterBy) {
      return rides; // If no rides or no filter provided, return all rides
    }
  
    switch (filterBy.toLowerCase()) {
      case 'from office':
        return rides.filter((ride) => ride.type === 'From Office');
      case 'to office':
        return rides.filter((ride) => ride.type === 'To Office');
      case 'others':
        return rides.filter((ride) => ride.type === 'Others');
      default:
        // Default to filtering by endpoint
        return rides.filter((ride) => ride.endPoint.includes(filterBy));
    }
   /*
    if (!filterBy) return rides;
    return rides.filter((ride) => ride.endPoint.includes(filterBy));
    */
  }
}


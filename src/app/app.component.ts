import { Component } from '@angular/core';
import { FlowerService } from './services/flower.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flowers By Colour';
  flowers: any[] = [];
   selectedFilter: string = localStorage.getItem('selectedFilter') || 'all';


  //colorCodes: string[] = ['all', 'red', 'blue', 'yellow', 'green', 'purple', 'pink'];
  constructor(private flowerService: FlowerService) { }

  // onFilterChange(filter: string): void {
  //   //localStorage.setItem('selectedFilter', filter);

  // }
onFilterChange(filter: string) {
  console.log('Filter changed to:', filter);
  this.selectedFilter = filter;
  this.loadImages(filter);
}
  loadImages(filter: string) {
    let filterText = 'flowers';
    let colorCode = filter === 'all' ? undefined : Number(filter);
    this.flowerService.getFlowers(filterText, 1, colorCode).subscribe((res) => {
      this.flowers = res.flowers.photo; // Make sure to extract the array
    });
  }
}

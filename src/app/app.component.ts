import { Component } from '@angular/core';
import { FlowerService } from './services/flower.service';
import { Flower } from './models/flower.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFilter: string = localStorage.getItem('selectedFilter') || 'all';
  flowers: Flower[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  numPhotos: number = 0;

  constructor(private flowerService: FlowerService) {
    this.loadImages(this.selectedFilter, this.currentPage);
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.currentPage = 1;
    localStorage.setItem('selectedFilter', filter);
    this.loadImages(filter, 1);
  }

  loadImages(filter: string, page: number) {
    this.loading = true;
    let filterText = 'flowers';
    let colorCode = filter === 'all' ? undefined : Number(filter);
    this.flowerService.getFlowers(filterText, page, colorCode).subscribe({
      next: (res) => {
        this.flowers = res.photos.photo;
        this.loading = false;
        this.numPhotos = +res.photos.total;
      },
      error: () => {
        this.flowers = [];
        this.loading = false;
      }
    });
  }

  loadMore() {
    this.currentPage++;
    this.loadImages(this.selectedFilter, this.currentPage);
  }
}

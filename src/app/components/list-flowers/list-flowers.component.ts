import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Flower } from 'src/app/models/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-list-flowers',
  templateUrl: './list-flowers.component.html',
  styleUrls: ['./list-flowers.component.scss']
})
export class ListFlowersComponent implements OnInit {
  @Input() flowers: Flower[] = [];
  numPhotos: number = 0;
  currentPage: number = 1;
  @Input() selectedFilter: string = '';
  loading: boolean = false;

  constructor(private flowerService: FlowerService) {}

  ngOnInit(): void {
    console.log('ListFlowersComponent initialized');
    if (!this.flowers || this.flowers.length === 0) {
      this.selectedFilter = localStorage.getItem('selectedFilter') || '';
      this.loadFlowers();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', this.flowers);
    if (
      changes['selectedFilter'] &&
      !changes['selectedFilter'].firstChange &&
      (!this.flowers || this.flowers.length === 0)
    ) {
      this.currentPage = 1;
      this.loadFlowers();
    }
  }

  loadFlowers(): void {
    this.loading = true;
    console.log('Loading flowers with filter:', this.selectedFilter, 'and page:', this.currentPage);
    this.flowerService
      .getFlowers(this.selectedFilter, this.currentPage)
      .subscribe({
        next: (flowers) => {
          this.flowers = flowers.photos.photo;
          this.numPhotos = flowers.photos.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading flowers:', error);
           this.loading = false;
        }
      });
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    localStorage.setItem('selectedFilter', filter);
    this.currentPage = 1;
    this.loadFlowers();
  }

  loadMore(): void {
    this.currentPage++;
    this.loadFlowers();
  }
  getFlickrImageUrl(flower: any, size: string = ''): string {
    const suffix = size ? `_${size}` : '';
    return `https://farm${flower.farm}.staticflickr.com/${flower.server}/${flower.id}_${flower.secret}${suffix}.jpg`;
  }
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Flower } from 'src/app/models/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-list-flowers',
  templateUrl: './list-flowers.component.html',
  styleUrls: ['./list-flowers.component.scss']
})
export class ListFlowersComponent {
  @Input() flowers: Flower[] = [];
  numPhotos: number = 0;
  currentPage: number = 1;
  @Input() selectedFilter: string = '';
  @Input() loading: boolean = false;

  constructor(private flowerService: FlowerService) {}

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    localStorage.setItem('selectedFilter', filter);
    this.currentPage = 1;
    //this.loadFlowers();
  }

  loadMore(): void {
    this.currentPage++;
    //this.loadFlowers();
  }
  getFlickrImageUrl(flower: any, size: string = ''): string {
    const suffix = size ? `_${size}` : '';
    return `https://farm${flower.farm}.staticflickr.com/${flower.server}/${flower.id}_${flower.secret}${suffix}.jpg`;
  }
}

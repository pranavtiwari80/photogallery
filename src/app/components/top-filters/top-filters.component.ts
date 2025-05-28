import { FlowerService } from 'src/app/services/flower.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-filters',
  templateUrl: './top-filters.component.html',
  styleUrls: ['./top-filters.component.scss']
})
export class TopFiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();
  constructor(private flowerService: FlowerService) { }

  ngOnInit(): void {
  }
  onFilterChange(filter: string): void {
    //this.filterChange.emit(filter);
    //localStorage.setItem('selectedFilter', filter);
    this.filterChange.emit(filter);
  localStorage.setItem('selectedFilter', filter);
  }

}

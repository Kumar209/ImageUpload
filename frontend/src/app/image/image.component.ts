import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  products: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching products', error);
    });
  }
  getImageUrl(relativePath: string): string {
    return `https://localhost:44334/${relativePath}`;
  }
}


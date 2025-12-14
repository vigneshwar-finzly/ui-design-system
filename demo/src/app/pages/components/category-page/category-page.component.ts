import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentDataService } from '../../../services/component-data.service';
import { ComponentDocumentation } from '../../../models/component-doc.model';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  category: any;
  components: ComponentDocumentation[] = [];

  constructor(
    private route: ActivatedRoute,
    private componentDataService: ComponentDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['category'];
      this.category = this.componentDataService.getCategoryInfo(categoryId);
      this.components = this.componentDataService.getComponentsByCategory(categoryId);
    });
  }
}

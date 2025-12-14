import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComponentDataService } from '../../../services/component-data.service';

@Component({
  selector: 'app-components-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.scss']
})
export class ComponentsListComponent {
  categories = this.componentDataService.getAllCategories();

  constructor(private componentDataService: ComponentDataService) {}

  getComponentsInCategory(categoryId: any) {
    return this.componentDataService.getComponentsByCategory(categoryId);
  }
}

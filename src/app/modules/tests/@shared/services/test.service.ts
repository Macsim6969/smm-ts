import { Injectable } from "@angular/core";
import { Category } from "../model/category.interface";

@Injectable()

export class TestService {
  categories: Category[] = [
    {
      name: 'Category 1',
      subcategories: [
        {
          name: 'Subcategory 1-1',
          items: ['Item 1-1-1', 'Item 1-1-2']
        },
        {
          name: 'Subcategory 1-2',
          items: ['Item 1-2-1', 'Item 1-2-2']
        }
      ]
    },
    {
      name: 'Category 2',
      subcategories: [
        {
          name: 'Subcategory 2-1',
          items: ['Item 2-1-1', 'Item 2-1-2']
        }
      ]
    }
  ];

  get _categories(): Category[] {
    return this.categories;
  }
}
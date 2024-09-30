import { Component, OnInit } from '@angular/core';
import { TestService } from './@shared/services/test.service';
import { Category } from './@shared/model/category.interface';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent implements OnInit {

  public categoriesData: Category[];
  public isOpenSubcategories: boolean[] = [];
  public searchText: string = '';

  constructor(
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.initDataCateforyFromService();
  }

  private initDataCateforyFromService() {
    this.categoriesData = this.testService._categories;
  }

  public openCategory(index: number) {
    this.isOpenSubcategories[index] = !this.isOpenSubcategories[index];
  }

}

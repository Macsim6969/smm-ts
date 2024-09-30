import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../model/category.interface";


@Pipe({
  name: "search"
})


export class SearchCategoriesPipe implements PipeTransform {
  transform(args: Category[], value: string) {
    if (!value.trim()) {
      return args;
    }

    const searchData = value.toLocaleLowerCase();

    return args
      .map(category => {
        const filteredSubcategories = category.subcategories
          .map(subcategory => {
            const filteredItems = subcategory.items.filter(item =>
              item.toLocaleLowerCase().includes(searchData)
            );

            if (subcategory.name.toLocaleLowerCase().includes(searchData) || filteredItems.length > 0) {
              return {
                ...subcategory,
                items: filteredItems
              };
            }

            return null;
          })
          .filter(subcategory => subcategory !== null);

        if (category.name.toLocaleLowerCase().includes(searchData) || filteredSubcategories.length > 0) {
          return {
            ...category,
            subcategories: filteredSubcategories
          };
        }

        return null; 
      })
      .filter(category => category !== null);
  }
}


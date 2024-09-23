import { select, Store } from "@ngrx/store"
import { StoreInterface } from "../../store/model/store.model"
import { selectUserProjects } from "../../store/selectors/store.selectors"
import { IPages } from "../model/pages.interface"

export namespace ProjectPages {
  export class ProjectPageSettings {
    constructor(
      private store: Store<{ store: StoreInterface }>
    ) { }

    public getNameActivePage(id: string, callback: (name: string) => void): void {
      this.store.pipe(select(selectUserProjects))
        .subscribe((data: IPages[]) => {
          const namePJ = data?.find(page => page.name === id);
          callback(namePJ?.name || '');
        });
    }



  }

}
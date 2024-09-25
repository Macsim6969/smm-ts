import { IPages } from "../../shared/model/pages.interface";


export interface StoreInterface {
  isLogin: boolean;
  activeProject: string
  userProjects: IPages[]
  pagesSidebarList: string[]
 
}

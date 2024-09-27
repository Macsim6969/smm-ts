import { IFolder } from "../../modules/drafts/@shared/models/folder.interface";
import { IPages } from "../../shared/model/pages.interface";


export interface StoreInterface {
  isLogin: boolean;
  activeProject: string;
  userProjects: IPages[];
  pagesSidebarList: string[];
  draftsFolders: IFolder[];
  draftsActiveFolder: IFolder;
  draftsChoiceFolderData: string;
}

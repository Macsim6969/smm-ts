import { IFolder } from "../../modules/drafts/@shared/models/folder.interface";
import { IChatsList, IChats } from "../../modules/messages/@shared/models/chats.inteface";
import { IPages } from "../../shared/model/pages.interface";


export interface StoreInterface {
  isLogin: boolean;
  activeProject: string;
  userProjects: IPages[];
  pagesSidebarList: string[];
  
  //Draft Page
  draftsFolders: IFolder[];
  draftsActiveFolder: IFolder;
  draftsChoiceFolderData: string;

  // Meesages Chats Page
  chatsLists: IChatsList[];
  chatsData: IChats[];
  activeChatsData: string;
}

import { StoreInterface } from './../model/store.model';

export const selectIsLogin = (store: { store: StoreInterface }) => store.store.isLogin;
export const selectActiveProject = (store: { store: StoreInterface }) => store.store.activeProject;
export const selectUserProjects = (store: { store: StoreInterface }) => store.store.userProjects;
export const selectPagesList = (store: { store: StoreInterface }) => store.store.pagesSidebarList;

//Drafts Pages
export const selectChangesFromActiveFolders = (store: { store: StoreInterface }) => store.store.draftsChoiceFolderData;
export const selectFolders = (store: { store: StoreInterface }) => store.store.draftsFolders;
export const selectActiveFolders = (store: { store: StoreInterface }) => store.store.draftsActiveFolder;

//Messages Page

export const selectMessagesLists = (store: { store: StoreInterface }) => store.store.chatsLists;
export const selectMessagesChat = (store: { store: StoreInterface }) => store.store.chatsData; 
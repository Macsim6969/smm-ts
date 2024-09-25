import { StoreInterface } from './../model/store.model';

export const selectIsLogin = (store: { store: StoreInterface }) => store.store.isLogin;
export const selectActiveProject = (store: { store: StoreInterface }) => store.store.activeProject;
export const selectUserProjects = (store: { store: StoreInterface }) => store.store.userProjects;
export const selectPagesList = (store: { store: StoreInterface }) => store.store.pagesSidebarList;
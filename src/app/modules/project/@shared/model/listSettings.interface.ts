
export interface IListSettings {
  titleList: string;
  listContent: IContent[];
}

export interface IContent {
  title: string;
  key: string;
}

export interface IListPages {
  keyProject: string
  key: string[];
}
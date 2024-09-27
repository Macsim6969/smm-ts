export interface IChatsList {
  title: string
  key: string,
  route: string
}

export interface IChats {
  createDate: Date; 
  message: string;
  key: string;
  userCreate: string;
}
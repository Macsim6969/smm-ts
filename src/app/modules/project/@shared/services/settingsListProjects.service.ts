import { Injectable } from '@angular/core';
import { IListSettings } from '../model/listSettings.interface';

@Injectable()

export class SettingsListProjectsService {

  private listSettings: IListSettings[] = [
    {
      titleList: 'Chats',
      listContent: [
        {
          title: 'Drafts',
          key: 'draft'
        },
        {
          title: 'Saved Items',
          key: 'saved-items'
        },
        {
          title: 'Inbox',
          key: 'inbox'
        },
        {
          title: 'Direct messages',
          key: 'direct-messages'
        }
      ]
    }
  ];

  get _listSettings(): IListSettings[] {
    return this.listSettings;
  }

  set _listSettings(newList: IListSettings) {
    this.listSettings.push(newList);
  }

}
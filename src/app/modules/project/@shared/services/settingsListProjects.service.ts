import { Injectable } from '@angular/core';
import { IListSettings } from '../model/listSettings.interface';
import { BehaviorSubject } from 'rxjs';

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
    },
    {
      titleList: 'Audio System',
      listContent: [
        {
          title: 'Music',
          key: 'music'
        }
      ]
    }
  ];

  private isOpenSettingPopup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get _listSettings(): IListSettings[] {
    return this.listSettings;
  }

  set _listSettings(newList: IListSettings) {
    this.listSettings.push(newList);
  }


  set _isOpenSettings(newValue: boolean) {
    this.isOpenSettingPopup.next(newValue);
  }

  get _isOpenSettings$() {
    return this.isOpenSettingPopup;
  }


}
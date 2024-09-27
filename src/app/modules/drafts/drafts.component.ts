import { Component, OnDestroy, OnInit } from '@angular/core';
import { DraftsApiService } from './@shared/services/draftsApi.service';
import { BehaviorSubject, combineLatest, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectActiveFolders, selectActiveProject, selectChangesFromActiveFolders, selectFolders } from '../../store/selectors/store.selectors';
import { IFolder } from './@shared/models/folder.interface';
import { setActiveFolder } from '../../store/actions/drafts.action.';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public dataContent: string = '';
  public newFolder: string;
  public listsFolder: IFolder[];
  public isActiveFolder: IFolder;
  public isNewCreate: boolean;

  private activeProject: string;

  constructor(
    private draftApiService: DraftsApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamToActiveProject();
    this.streamToChangeActiveFolders();
    this.streamToChangeDataInFolder();
    this.setupSaveData();
  }

  private streamToActiveProject() {
    this.store.pipe(select(selectActiveProject), takeUntil(this.destroy$))
      .subscribe((data: string) => {
        this.activeProject = data;
      })
  }

  private streamToChangeActiveFolders() {
    combineLatest(([this.store.pipe(select(selectFolders)), this.store.pipe(select(selectActiveFolders))])).pipe(takeUntil(this.destroy$))
      .subscribe(([foldersData, activeFolders]) => {
        this.listsFolder = Object.values(foldersData);
        this.isActiveFolder = activeFolders;
      })
  }

  private streamToChangeDataInFolder() {
    this.store.pipe(select(selectChangesFromActiveFolders), takeUntil(this.destroy$)).subscribe((data) => {
      this.dataContent = data || '';
    });
  }

  private setupSaveData() {
    const input$ = new Subject<string>();

    input$.pipe(
      debounceTime(1000),  // Wait for 1 second pause
      distinctUntilChanged(),  // Only emit if the current value is different than the last
      takeUntil(this.destroy$)  // Complete when component is destroyed
    ).subscribe(data => {
      this.draftApiService.setChangesToFolderData(this.isActiveFolder.key, data);
    });

    this.dataContentChange = (value: string) => {
      input$.next(value);
    };
  }

  public dataContentChange: (value: string) => void;

  public createNewFolder() {
    this.isNewCreate = true;
  }

  public saveFolder() {
    const newData: IFolder = {
      key: `${this.activeProject}-${this.newFolder}`,
      name: this.newFolder,
      route: `/${this.newFolder}`
    }
    this.draftApiService.setNewFoldersToProject(newData);
    this.isNewCreate = false;
  }

  public choiceFolder(key: IFolder) {
    this.store.dispatch(setActiveFolder({ value: key }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

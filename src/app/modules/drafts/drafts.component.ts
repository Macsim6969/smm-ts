import { Component, OnDestroy, OnInit } from '@angular/core';
import { DraftsApiService } from './@shared/services/draftsApi.service';
import { Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectChangesFromActiveFolders } from '../../store/selectors/store.selectors';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public dataContent: string = '';

  constructor(
    private draftApiService: DraftsApiService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamToChangeActiveFolders();
    this.setupSaveData();
  }

  private streamToChangeActiveFolders() {
    this.store.pipe(select(selectChangesFromActiveFolders), takeUntil(this.destroy$)).subscribe((data) => {
      this.dataContent = data || '';
    });
  }

  private setupSaveData() {
    // Create an observable from the textarea input
    const input$ = new Subject<string>();

    input$.pipe(
      debounceTime(1000),  // Wait for 1 second pause
      distinctUntilChanged(),  // Only emit if the current value is different than the last
      takeUntil(this.destroy$)  // Complete when component is destroyed
    ).subscribe(data => {
      this.draftApiService.setChangesToFolderData(data);
    });

    // Bind the observable to the textarea input
    this.dataContentChange = (value: string) => {
      input$.next(value);
    };
  }

  public dataContentChange: (value: string) => void;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

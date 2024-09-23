import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { Injectable } from "@angular/core";
import { withLatestFrom } from "rxjs";

@Injectable()
export class AuthEffects {


  // startAuth = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(startGetData),
  //     withLatestFrom(this.store.pipe(select(selectUserId))),
  //     tap(([action, id]) => {
  //       this.backendService.getUserInfo(id);
  //       this.backendService.getDashboardInfo(id);
  //       this.backendService.getMemo();
  //       this.backendService.getUsers();
  //       this.backendService.getPaymentVouchers();
  //       this.backendService.getPayrollData();
  //       this.payrollApi.getPayrollSalary();
  //       this.maintenanceApi.getMaintenanceDashboard();
  //       this.notificationApi.getNotification(id);
  //       this.settingsApi.getSettingData(id);
  //     })
  //   )
  //   ,
  //   { dispatch: false }
  // );

  constructor(private actions$: Actions,
    private store: Store<{ store: StoreInterface }>
  ) { }

}
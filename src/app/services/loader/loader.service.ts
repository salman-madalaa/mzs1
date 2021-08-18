import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public isLogin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._authenticationService.isUserLoggedIn());

  constructor(public SpinnerSer:NgxSpinnerService,public _authenticationService:AuthenticationService) { }

  showNgxSpinner(){
    this.SpinnerSer.show();
  }

  hideNgxSpinner(){
    this.SpinnerSer.hide();
  }


}

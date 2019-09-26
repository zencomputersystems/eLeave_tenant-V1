import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../../services/user-data.service';
import { PaginationServiceService } from '../../services/pagination-service.service';

import { toolbarPopup } from '../../app.component';

/**
 * Component for User drop down menu in toolbar
 * This component is to show user status and logout button
 *
 * @export
 * @class UserDropDownComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.scss'],
})

export class UserDropDownComponent implements OnInit {


  /**
   *Creates an instance of UserDropDownComponent.
   * @param {UserDataService} userDataSvs
   * @param {PaginationServiceService} pggSvs
   * @param {Router} router
   * @memberof UserDropDownComponent
   */
  constructor(
    private userDataSvs: UserDataService,
    private pggSvs: PaginationServiceService,
    private router: Router
  ) { }


  /**
   * Initialization of UserDropDownComponent
   *
   * @memberof UserDropDownComponent
   */
  ngOnInit() {}


  /**
   * Executed when user click logut
   * It will reset the current username in server's storage
   * And will navigate to login page
   *
   * @memberof UserDropDownComponent
   */
  async onClickLogout() {
    this.userDataSvs.logout().then(() => {
      toolbarPopup.dismiss();
      this.pggSvs.setShowSideMenu(false);
      return this.router.navigateByUrl('/login');
    });
  }

}

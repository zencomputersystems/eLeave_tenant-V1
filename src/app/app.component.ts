import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserDropDownComponent } from './layout/user-drop-down/user-drop-down.component';

import { PaginationServiceService } from './services/pagination-service.service';
import { UserDataService } from './services/user-data.service';


/**
 * This variable is to store values of customer data
 * @memberof AppComponent
 */
export let customersDummiesData;

/**
 * This variable is to store value of salesman data
 * @memberof AppComponent
 */
export let salesmanDummiesData;

/**
 * This variable is to store value of users data
 * @memberof AppComponent
 */
export let userDummiesData;

/**
 * This variable is to store value of logged user's email
 * @memberof AppComponent
 */
export let currUser = { value: '' };

/**
 * This variable is to store value for popup in toolbar
 * @memberof AppComponent
 */
export let toolbarPopup;

/**
 * This variable is to store get sample data from json file
 * @memberof AppComponent
 */
declare const require: any;

/**
 * This component is to set up the app root
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  /**
   * Creates an instance of AppComponent.
   * @param {Platform} platform This property is to get method from Platform
   * @param {PopoverController} popoverController This property is to get method from PopoverController
   * @param {PaginationServiceService} settingPage This property is to get method from PaginationServiceService
   * @memberof AppComponent
   */
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private popoverController: PopoverController,
    public settingPage: PaginationServiceService,
    private router: Router
    // public userDataSvs: UserDataService
  ) {
    this.initializeApp();
  }

  /**
   * This property is to get events from UserDataService
   * @memberof AppComponent
   */
  public evt;

  /**
   * This property is to get Storage from UserDataService
   * @memberof AppComponent
   */
  public storages;

  /**
   * This property is to get methods from UserDataService
   * @memberof AppComponent
   */
  public userDataSvs = new UserDataService(this.evt, this.storages);
  
  /**
   * This property is to set side menu's title, url and icon
   * @memberof AppComponent
   */
  public appPages = [
    {
      title: 'Dashboard',
      url: '/main/dashboard',
      icon: 'icon_dashboard.svg'
    },
    {
      title: 'Customers',
      url: '/main/customers',
      icon: 'icon_customers.svg'
    },
    {
      title: 'Subscriptions',
      url: '/main/subscriptions',
      icon: 'icon_products.svg'
    },
    {
      title: 'Support',
      url: '/main/support',
      icon: 'icon_chat-room.svg'
    },
    {
      title: 'Settings',
      url: '/main/settings',
      icon: 'icon_setting.svg'
    }
  ];

  /**
   * This property is to declare value for selected side bar
   * @memberof AppComponent
   */
  public selectedSidebar = 'Dashboard';

  /**
   * This property is to declare value for side menu (icon/full view)
   * @memberof AppComponent
   */
  public sideMenuStyle = 'fullMenu';

  /**
   * This property is to declare user was login or not
   * @memberof AppComponent
   */
  public loggedUser;

  /**
   * This method is initialize value of properties. It will be
   * executed when this page is loaded
   * @memberof AppComponent
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      new StatusBar().styleDefault();
      new SplashScreen().hide();
      // this.splashScreen.hide();
    });

    const json = require('./sample.json');

    customersDummiesData = json.customerSample;
    salesmanDummiesData = json.salepersonList;
    userDummiesData = json.userDetails;
    // this.loggedUser = 'No user';
    this.loggedUser = currUser;
    this.checkWindowWidth();
    // this.settingPage.setSideMenuType(this.sideMenuStyle);
    this.userDataSvs.setUserProfilePicture('../assets/icon/signin/zlatan.jpg');
  }

  /**
   * This method is to check the window width. If the width < 500, set side menu as
   * icon menu view. Else, set as full menu view
   * @memberof AppComponent
   */
  checkWindowWidth() {
    if (window.innerWidth < 992) {
      this.settingPage.setSideMenuType('iconMenu');
    } else {
      this.settingPage.setSideMenuType('fullMenu');
    }

  }

  /**
   * This method is to set popup in app components
   * @param {*} evt This property will bind event values from html
   * @param {*} compoName This property will bind component name from html
   * @returns
   * @memberof AppComponent
   */
  async openToolbarPopover(evt, compoName) {
    toolbarPopup = await this.popoverController.create({
      component: (compoName === 'UserDropDownComponent') ? UserDropDownComponent : UserDropDownComponent,
      componentProps: {
        viewType: this
      },
      event: evt,
      cssClass: 'pop-over-user-style'
    });

    return await toolbarPopup.present();
  }

  /**
   * This method is to set side menu is collapsed or extended
   * @param {*} boolCollapse This property is to pass value of side menu in full menu view or side menu view
   * @memberof AppComponent
   */
  collapseMenu(boolCollapse) {
    this.sideMenuStyle = (boolCollapse === true) ? 'iconMenu' : 'fullMenu';
    this.settingPage.setSideMenuType(this.sideMenuStyle);
  }

  /**
   * This method is to get event when notification button is clicked
   * @param {*} event
   * @memberof AppComponent
   */
  clickNotiBtn(event) {
    console.log('clickNotiBtn');
    console.log(event);
  }

  onResize() {
    if (window.innerWidth < 992) {
      this.collapseMenu(true);
    }
  }
}

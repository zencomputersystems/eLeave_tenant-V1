import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

/**
 * This service is to set up the success/warning/danger 
 * alert popup
 * @export
 * @class InfoPopupService
 */
@Injectable({
  providedIn: 'root'
})
export class InfoPopupService {

  /**
   * Creates an instance of InfoPopupService.
   * @param {AlertController} alertController This property is to get methods from AlertController service
   * @memberof InfoPopupService
   */
  constructor(
    public alertController: AlertController
  ) { }

  /**
   * This method is to set alert popup service
   * @param {*} msg This parameter is to pass the popup message
   * @param {*} cssTitle This parameter is to pass css class for the popup
   * @memberof InfoPopupService
   */
  async alertPopup(msg, cssTitle) {
    const alert = await this.alertController.create({
      message: msg,
      cssClass: cssTitle// 'alert-success' / 'alert-warning' / 'alert-danger'
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 2500);
  }

  async confirmationPopup(msg, cssTitle) {
    const confirm = await this.alertController.create({
      header: 'Confirm!',
      cssClass: cssTitle,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
            return false;
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            // confirm.dismiss();
            return true;
          }
        }
      ]
    });

    await confirm.present();
  }
}

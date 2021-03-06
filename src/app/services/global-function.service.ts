import { Injectable } from '@angular/core';

/**
 * This service is to set basic global functions that probabbly will involve multiple components
 * @export
 * @class GlobalFunctionService
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionService {

  /**
   * Creates an instance of GlobalFunctionService.
   * @memberof GlobalFunctionService
   */
  constructor() { }

  /**
   * This method is to convert date time to date string format (eg: Tue Feb 10 2015)
   * @param {*} dateValue This parameter is to pass date value to be converted
   * @returns
   * @memberof GlobalFunctionService
   */
  changeDateFormattoDateString(dateValue) {
    const dateVal = new Date(dateValue);
    return dateVal.toDateString();
  }

  /**
   * This method is to convert date time to DD MM YYYY format with full month name (eg: 10 January 2019)
   * @param {*} dateValue This parameter is to pass date value to be converted
   * @returns
   * @memberof GlobalFunctionService
   */
  changeDateFormatFull(dateValue) {
    const dateVal = new Date(dateValue);
    const monthValFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return dateVal.getDate() + ' ' + monthValFull[dateVal.getMonth()] + ' ' + dateVal.getFullYear(); 
  }

  /**
   * This method is to convert date time to DD MM YYYY format with simplified month name (eg: 10 Jan 2019)
   * @param {*} dateValue This parameter is to pass date value to be converted
   * @returns
   * @memberof GlobalFunctionService
   */
  changeDateFormatSimple(dateValue) {
    const dateVal = new Date(dateValue);
    const monthValSimple = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return dateVal.getDate() + ' ' + monthValSimple[dateVal.getMonth()] + ' ' + dateVal.getFullYear(); 
  }

  /**
   * This method is to change date format to DD MM YY
   * @param {*} dateValue This parameter is to pass date value to be converted
   * @returns
   * @memberof GlobalFunctionService
   */
  changeDateFormatSimpleDDMMYYYY(dateValue) {
    const dateVal = new Date(dateValue);
    const ddVal = (dateVal.getDate() < 10) ? '0' + dateVal.getDate() : dateVal.getDate();
    const monthValSimple = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ddVal + ' ' + monthValSimple[dateVal.getMonth()] + ' ' + dateVal.getFullYear();
  }

  /**
   * This method is to change date format to YYYY-MM-DD HH:mm:ss
   * @param {*} dateValue This parameter is to pass date value to be converted
   * @param {*} cond This parameter is to pass value that will decide the return format (0/1)
   * @returns
   * @memberof GlobalFunctionService
   */
  changeDateFormatYYYYMMDD(dateValue, cond) {
    const dateVal = new Date(dateValue);
    const ddVal = (dateVal.getDate() < 10) ? '0' + dateVal.getDate() : dateVal.getDate();
    const mmVal = ((dateVal.getMonth() + 1) < 10) ? '0' + (dateVal.getMonth() + 1) : dateVal.getMonth() + 1;
    // return dateVal.getFullYear() + '-' + mmVal + '-' + dateVal.getDate() + " 00:00:00";
    return (cond === 0) ? dateVal.getFullYear() + '-' + mmVal + '-' + dateVal.getDate() + " 00:00:00" :
      (cond === 1) ? ddVal + '/' + mmVal + '/' + dateVal.getFullYear() :
        dateVal.getFullYear() + '-' + mmVal + '-' + dateVal.getDate();
  }

  /**
   * This method is to get hourly time in AM or PM
   * @param {*} dateValue This parameter is to pass date value to be converted
   * @returns It will return hourly value in AM or PM
   * @memberof GlobalFunctionService
   */
  getHoursFormatAMPM(dateValue) {
    const dateVal = new Date(dateValue);
    return dateVal.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  /**
   * This method is to set time format in activty log
   * @param {*} obj This parameter will pass objects that contain date to be converted
   * @returns This returns will return the value of converted datetime
   * @memberof GlobalFunctionService
   */
  appendArrayChangedDateFormat(obj) {
    return Object.assign(obj, { 
      'HIST_TIME': this.changeDateFormatYYYYMMDD(obj.CREATION_TS, 2) +
        ' - ' + this.getHoursFormatAMPM(obj.CREATION_TS) 
    });
  }
  
  /**
   * This method is to get days difference between next billing date and current date
   * @param {*} nextBillDate This parameter is a next billing date to be passed
   * @returns
   * @memberof GlobalFunctionService
   */
  dateDiff(nextBillDate) {
    const currDate = new Date().toDateString();
    let daysleft: number = (Date.parse(nextBillDate) - Date.parse(currDate)) / (24 * 3600 * 1000);
    return daysleft = (isNaN(daysleft)) ? daysleft = 0 : daysleft;
    // return daysleft = (isNaN(daysleft) || (daysleft < 0)) ? daysleft = 0 : daysleft;

  }

  /**
   * This method is to set configurations to be shown in customer details and subscription details
   * @returns 
   * @memberof GlobalFunctionService
   */
  slideOption() {
    return {
      slidesPerView: 3,
      on: {
        beforeInit() {
          const swiper = this;

          swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        }
      }
    }
  }

  /**
   * This method is to sort objects into ascending/descending order based on CREATION_TS. And this method
   * will be used after getting historical activity log and before it displayed in UI
   * @param {*} obj This parameter will pass an array object for historical activity log
   * @param {*} type This parameter will pass the value to decide the order ascending/descending. Eg: asc, desc
   * @returns
   * @memberof GlobalFunctionService
   */
  sortArrAsc(obj, type) {
    const ret = (type === 'asc') ? obj.sort((a, b) => (a.CREATION_TS > b.CREATION_TS) ? 1 : ((b.CREATION_TS > a.CREATION_TS) ? -1 : 0)) 
      : obj.sort((a, b) => (a.CREATION_TS > b.CREATION_TS) ? -1 : ((b.CREATION_TS > a.CREATION_TS) ? 1 : 0));
    
      return ret;
    // return obj.sort((a, b) => (a.CREATION_TS > b.CREATION_TS) ? 1 : ((b.CREATION_TS > a.CREATION_TS) ? -1 : 0));
  }
}

import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar
  ) {
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, 'close', {
      duration: 3000, // in milli-seconds
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  /*
    Swap Object by Key
    =======================================
     Implementation:
                       TODO Input: arrayObj  = [{Name:"james",Id: 22},{Name:"john",Id: 25}]
                       TODO Input: arrayObjNew  = {Name:"shara",Id: 22}
                       swapArrayObject(arrayObjNew, arrayObj , 'Id');
                       ? Output: [{Name:"shara",Id: 22},{Name:"john",Id: 25}]
   */
  swapArrayObject(object: any, list: any[], primaryKey: string) {

    for (const x of list) {

      if (x[primaryKey] === object[primaryKey]) {

        const index = list.indexOf(x);
        list[index] = object;
        break;
      }
    }

    return list;
  }

  /*
     !Sort array of objects by key
     =======================================
     Implementation:
                     TODO Input: arrayObj  = [{name:"james",sortOrder: 2},{name:"john",sortOrder: 1}];
                     arrayObj.sort((a, b) => sortArrayObjByKey(a, b, 'sortOrder'));
                     ? Output: [{name:"john",sortOrder: 1}{name:"james",sortOrder: 2}]
  */
  sortArrayObjByKey(a: any, b: any, key: string) {
    return a[key] - b[key];
  }

  /*
     !Merge two array of objects, removes duplicate objects
     =======================================
     Implementation:
                     TODO Input: arrayObj1  = [{name:"a"},{name:"b"}];
                     TODO Input: arrayObj2  = [{name:"a"},{name:"c"}];
                     mergedArrayObj = uniqueMergeArrayObj(arrayObj1, arrayObj2);
                     ? Output: [{name:"a"},{name:"b"},{name:"c"}]
  */
  uniqueMergeArrayObj(arr1: any[], arr2?: any[]) {

    const duplicateArray = [...arr1, ...arr2];
    return [...new Set(duplicateArray.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
  }

  /*
      * 1> ISOString format with UTC / Coordinated Universal Time
       ! '2019-12-13T06:45:23.370' => T06:45:23.370 is ISO DateTime String (UTC) => T06:45:23.370Z
       ! Save ISOString (UTC time) to database
       ! Fetch ISOString (UTC time) from database and display 'LocalDateTime' in UI
      * 2> ISOString format with local time
      ! Save ISOString / UTC time to database
      ! Fetch ISOString and display 'LocalDateTime' in UI 
       =======================================
       Implementation:
                      * 1> ISOString format with UTC / Coordinated Universal Time     
                       TODO Input: new Date() / Local DateTime Object => Save to server
                       toJsDate('2019-12-13T06:45:23.370', 'UTCString');
                       ? Output: UTC date time string eg: '2019-12-13T06:45:23.370Z'
 
                       TODO Input: '2019-12-13T06:45:23.370' ISO DateTime String (UTC) => Diaplay in UI
                       toJsDate('2019-12-13T06:45:23.370', 'LocalDateTime');
                       ? Output: Javascript Date Object (Local)
 
                       * 2> ISOString format with local time
                       TODO Input: new Date() / Local DateTime Object => Save to server
                       toJsDate(new Date(), 'ISOString');
                       ? Output: ISO Date String eg: '2019-12-13T06:45:23.370Z'
                       
                       TODO Input: '2019-12-13T06:45:23.370' ISOString format with local time => Diaplay in UI
                       toJsDate('2019-12-13T06:45:23.370', 'JsDate');
                       ? Output: Javascript Date Object (Local)
   */
  toJsDate(date: any, returnType: string): any {

    if (!date && !this.isValidDate(date)) {
      return date;
    }

    try {

      returnType = returnType.toLowerCase();
      let year: number, month: number, day: number, datePart: any,
        mm: any, dd: any, hh: any, ss: any, ms: any;

      if (returnType === 'jsdate') {  // yyyy-mm-dd OR MM-dd-yyyy date => Javascript Date Object (Local)

        const iSOSeperator = date.includes('-');
        // Split DateParts => Output: ["2019", "12", "13T06:45:23.370"] or ["12",  "13","2019T06:45:23.370"]
        datePart = date.split(iSOSeperator ? '-' : '/');

        // Split Day & Time from DateParts 13T06:45:23.370 => Output: ["13", "06:45:23.370"]
        const dayOrYearAndTime = datePart[2].split('T');
        datePart[2] = dayOrYearAndTime[0]; // Replace Day value "13T06:45:23.370" with "13" or "2019T06:45:23.370" with "2019"

        year = datePart[iSOSeperator ? 0 : 2];
        month = datePart[iSOSeperator ? 1 : 0];
        day = datePart[iSOSeperator ? 2 : 1];

        // Split TimeParts from Time => Output: ["06", "45", "23.370"]
        const timePart = dayOrYearAndTime[1] ? dayOrYearAndTime[1].split(':') : null;
        // Split millisec from sec => Output:  ["23", "370"]
        const secondMilliSec = (timePart && timePart[2]) ? timePart[2].split('.') : null;

        hh = Number((timePart && timePart[0]) ? timePart[0] : 0);
        mm = Number((timePart && timePart[1]) ? timePart[1] : 0);
        ss = Number((secondMilliSec && secondMilliSec[2]) ? secondMilliSec[0] : 0);
        ms = Number((timePart && timePart[0]) ? timePart[0] : 0);

        date = new Date(year, month - 1, day, hh, mm, ss, ms);

      } else if (returnType === 'localdatetime') { // ISO Date String => Javascript Date Object (Local)

        date = new Date(`${date}Z`).toLocaleString();

      } else if (returnType === 'utcstring') { // ISO Date String with UTC time

        const dateISOStr = date.toISOString();

        const time = date.toISOString().split('T')[1];
        date = `${dateISOStr.split('T')[0]}T${time}`;

      } else if (returnType.toLowerCase() === 'isostring') { // ISO Date String  with local Time

        const localDate = date.toLocaleDateString();
        datePart = localDate.split('/');
        year = datePart[2];
        month = datePart[0];
        day = datePart[1];

        mm = month < 10 ? `0${month}` : month;
        dd = day < 10 ? `0${day}` : day;

        const time = date.toTimeString();
        const zone = date.toISOString();
        date = `${year}-${mm}-${dd}T${time.split(' ')[0]}.${zone.split('.')[1]}`;

      } else if (returnType === 'date') { // date without time string

        const localDate = date.toLocaleDateString();
        datePart = localDate.split('/');
        year = datePart[2];
        month = datePart[0];
        day = datePart[1];

        mm = month < 10 ? `0${month}` : month;
        dd = day < 10 ? `0${day}` : day;

        date = `${year}-${mm}-${dd}`;
      }

      return date;

    } catch (err) {
      return date;
    }
  }

  isValidDate(date: any) {

    let isValid = true;
    if (isNaN(date) && new Date(date).toString() !== 'Invalid Date') {

      isValid = true;
    } else {

      isValid = false;
    }

    return isValid;
  }

  /*
      !Get Value
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'value');
                     ? Output: form.value

      !Get Value By Fields
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'value', ['userName','password]);
                     ? Output: form.value

      !Get Errors
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'errors'); //*** get all errors
                     OR
                     formUtility(form, 'errors', ['userName','password]);  //*** get errors by fields
                     ? Output: { username: {required: true}, password: {required: true} }

      !Get Value Changes
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'changes');
                     ? Output: { username: 'yawa@gmail.com', password: 'password@123' }
  */
  formUtility(form: FormGroup, type: string, fields?: string[]): any {

    if (form && type !== '') {

      if (type === 'validate') {

        Object.keys(form.controls).forEach(field => {
          const control = form.get(field);
          control.markAsTouched({ onlySelf: true });
        });

        return true;
      } else {

        const value = form.value;
        if (!fields) {

          fields = Object.keys(value);
        }

        for (const field of fields) {

          value[field] = value[field].trim();
        }

        if (type === 'value' && (!fields || fields.length === 0)) {

          return value;
        } else if (type === 'value' && fields.length > 0) {

          for (const field of fields) {

            if (!value.hasOwnProperty(field)) {
              delete value[field];
            }
          }

          return value;
        } else if (type === 'errors') {

          const errors = {};

          for (const field in fields) {

            if (!value.hasOwnProperty(field)) {
              continue;
            }

            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
              errors[field] = control.errors;
            }
          }

          return errors;
        } else if (type === 'changes') {

          const dirty = {};
          for (const field of fields) {

            if (form.controls[field].dirty) {

              dirty[field] = value[field].trim();
            }
          }

          return dirty;
        }
      }
    }
  }
}
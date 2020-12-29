import { Injectable } from '@angular/core';
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
      duration: 5000, // in milli-seconds
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

}
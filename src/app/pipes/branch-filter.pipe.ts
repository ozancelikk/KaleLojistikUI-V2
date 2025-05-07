import { Pipe, PipeTransform } from '@angular/core';
import { Branch } from '../models/branch/branch';

@Pipe({
  name: 'branchFilter',
  standalone: true
})
export class BranchFilterPipe implements PipeTransform {

  transform(value: any[], filtredText: string,keys:any): any[] {

    return filtredText ? value.filter((value2: any) => value2[`${keys}`].toLowerCase().indexOf(filtredText.toLowerCase()) !== -1) : value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[],filterData: {active:boolean,filter:({name:string,value:any}[]) |  {func:((item:any,...args:any[]) => Boolean),params:any}}): any {
    if (!items || !filterData.filter || !filterData.active) {
      return items;
  }
  let Type:{func:((item:any,...args:any[]) => Boolean),params:any[]};
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
  return items.filter(
    item => {
      if(filterData.filter.hasOwnProperty('func')){
        const callback = filterData.filter as {func:((item:any,...args:any[]) => Boolean),params:any};
        return callback.func(item,callback.params);
      } else {
        const properties = filterData.filter as {name:string,value:any}[];
        let res = true;
        properties.forEach(
          el => {
            res && item[el.name] === el.value;
          }
        )

        return res;
      }
    
    });
  }

}

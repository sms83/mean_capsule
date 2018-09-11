import { Pipe, PipeTransform } from '@angular/core';
import { Tasks } from '../model/Tasks';
import { TasksService } from '../../tasks.service';
@Pipe({
  name: 'filter',
  pure: false
})


export class FilterPipe implements PipeTransform {
    constructor(private tasksservice: TasksService)  {}   
        
    transform(items: any[], q1: string, q2: any,q3: any, q4: any,q5: string,q6: string){
        if (items && items.length){  
            
            return items.filter(item =>{  

                if (q1 && item.task.toLowerCase().indexOf(q1.toLowerCase()) === -1){
                    return false;
                }
              
                    if (q2 && q3){
                        if(!(item.priority >=  parseInt(q2) && item.priority <=  parseInt(q3))){
                            return false;
                        }                   
                    }
                    else{
                        if(q2){
                            if (!isNaN(q2) && item.priority != parseInt(q2) ) { 
                                return false;
                            }
                        }
                        if(q3){
                            if (!isNaN(q3) && item.priority != parseInt(q3) ) { 
                                return false;
                            }
                        }
                    }
                if (q4 && item.start_date.toLowerCase().indexOf(q5.toLowerCase()) === -1){
                    return false;
                }
                if (q5 && item.start_date.toLowerCase().indexOf(q5.toLowerCase()) === -1){
                    return false;
                }
                if (q6 && item.end_date.toLowerCase().indexOf(q6.toLowerCase()) === -1){
                    return false;
                }
               
                 return true;
           })
        }
        else{
            return items;
        }
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gettaskname'
})
export class GetTaskNamePipe implements PipeTransform {

  transform(taskId: any, tasks?: any): any {
    let foundTask = tasks.filter(task=>task._id == taskId)[0];
    return !!foundTask ? foundTask.task : '-' ;
  }

}

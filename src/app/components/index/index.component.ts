import { Component, OnInit } from '@angular/core';
import { Tasks } from '../model/Tasks';
import { TasksService } from '../../tasks.service';
import { FilterPipe } from '../filters/filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  tasksResult : Tasks[];
  searchText : string = '';
  userFilter: any = '';

    constructor( private route: ActivatedRoute,
      private router: Router,private tasksservice: TasksService) { }
  
    ngOnInit() {
      this.findalltask(); 
    }

    findalltask()
    {
      this.tasksservice
      .getAllTasks()
      .subscribe((data: Tasks[]) => {
      this.tasksResult = data;
    });
    }

    
    finishingTask(id) {
         this.tasksservice.finishRecord(id);
         window.location.reload();
         this.router.navigate(['index']);
      }
}

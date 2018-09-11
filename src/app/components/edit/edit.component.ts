import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TasksService } from '../../tasks.service';
import { Tasks } from '../model/Tasks';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksservice: TasksService, 
    private fb: FormBuilder) 
    {
       this.createForm(); 
    }

  editTaskForm: FormGroup;
  tasks: any = {};

   createForm() {
    this.editTaskForm = this.fb.group({
      task: ['', Validators.required ],
      parent_id: [''],
      priority : ['', Validators.required ],
      start_date: ['', Validators.required ],
      end_date: ['', Validators.required ],
      
   });
  }

   ngOnInit() {
    this.findbyID();
  }

  findbyID()
  {
    this.route.params.subscribe(params => {
      this.tasksservice.getTaskByID(params['id']).subscribe(res => {
        this.tasks = res;
    });
    });
   
  }

  updateTask(task,priority,start_date,end_date) {
    this.route.params.subscribe(params => {
       this.tasksservice.updateRecord(task,priority,start_date,end_date, params['id']);
       this.router.navigate(['index']);
       window.location.reload();
    });
  }

  
}

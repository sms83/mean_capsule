import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TasksService } from '../../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from '../model/Tasks';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {

  public model: any;
   
  constructor(private route: ActivatedRoute,
    private router: Router,private tasksservice: TasksService, private fb: FormBuilder) 
    { this.createForm(); }

    task : Tasks[];
    addTaskForm: FormGroup;
    
    
    parent_id : any;
    search:any;
    formatter:any;
    selectedParent:{_id:string, task:string} = null;
    clickedItem:string;
    tasksResult:{_id:string, task:string}[];
    
    ngbdTypeaheadTemplate() 
    {
      this.formatter = (x: {task: string}) => {
        console.log(x);
        return x.task;
      }; 
    this.search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.tasksResult.filter(tr => tr.task.toLowerCase().indexOf(term.toLowerCase()) > -1));
    }
  
    selectedItem(item){
      this.clickedItem=item.item._id;
      console.log('here we go');
      console.log(this.clickedItem);
    }
    
  

 createForm() {
    this.addTaskForm = this.fb.group({
      task: ['', Validators.required ],
      parent_id :[''],
      priority : ['', Validators.required ],
      start_date: ['', Validators.required ],
      end_date: ['', Validators.required ]     
   });
  }

  addTask(task,priority,start_date,end_date) {
   if(this.clickedItem)
   this.parent_id = this.clickedItem;
   else
   this.parent_id ="";

    this.tasksservice.addTaskRecord(task,this.parent_id,priority,start_date,end_date);
    this.router.navigate(['index']);
    window.location.reload();
  }
  
  findalltask()
    {
      return this.tasksservice
      .getAllTasks()
      .subscribe((data: any) => {
      this.tasksResult = data;
      console.log(this.tasksResult);
    });
     
    }


  
  ngOnInit() {
    this.ngbdTypeaheadTemplate();
    this.findalltask();
  }

}

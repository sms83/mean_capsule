import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Tasks } from './components/model/Tasks';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  uri = 'http://localhost:4000/tm';
  
    constructor(private http: HttpClient) { }
  
    addTaskRecord(task,parent_id,priority,start_date,end_date) {

     if(!parent_id)
     parent_id = null;

      const obj = {
        task: task,
        parent_id : parent_id,
        priority: priority,
        start_date : start_date,
        end_date : end_date
      };
      this.http.post(`${this.uri}/add`, obj)
          .subscribe( res => {console.log('Done');}, error => { this.ongetError(error)});
    }

      ongetError(error){}
      
      getAllTasks() 
      {
        return this.http.get(`${this.uri}/`);
      }
     
      getTaskByID(id) 
      {
        return this.http.get(`${this.uri}/edit/${id}`);
      }

      updateRecord(task,priority,start_date,end_date, id)
      {
         const obj = {
           task: task,
           priority: priority,
           start_date : start_date,
           end_date : end_date
         };
          this
          .http
          .post(`${this.uri}/update/${id}`, obj)
          .subscribe(res => console.log('Done'));
      }

      getTaskNameByID(parent_id)
      {
        
      }

      finishRecord(id) 
      {
        const obj = { finsihed: true };
         this
        .http
        .post(`${this.uri}/finish/${id}`, obj)
        .subscribe(res => console.log('Done'));
      }
}

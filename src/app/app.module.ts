import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterPipeModule } from 'ngx-filter-pipe';


// import 3rd party modules -- ++ imports
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// import component -- ++ in Declaration
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { EditComponent } from './components/edit/edit.component';
import { FilterPipe} from './components/filters/filter.pipe';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import service -- ++ in provider
import { TasksService } from './tasks.service';
import { FindtasknamePipe } from './components/filters/findtaskname.pipe';





const routes: Routes = [
  {path:'create', component :CreateComponent},
  {path:'index', component :IndexComponent},
  {path:'edit/:id', component :EditComponent},
  {path:'finish/:id', component :IndexComponent},
  { path: '', redirectTo: '/create', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    FilterPipe,
    FindtasknamePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FilterPipeModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }

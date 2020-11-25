import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService } from 'src/services/domian/agenda.service';
import { AgendaComponent } from './pages/agenda/agenda.component';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAgendaComponent } from './pages/modal-agenda/modal-agenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExibirComponent } from './pages/exibir/exibir.component';
import { AppRoutingModule } from './app-routing.nodule';
import { RouterModule } from '@angular/router';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    ModalAgendaComponent,
    ExibirComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  exports: [
    RouterModule
  ],
  providers: [
    AgendaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

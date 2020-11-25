
import { Component, Input, OnInit, ViewChild  } from '@angular/core';

import { formatDate, CalendarOptions, DateSelectArg, EventApi, EventClickArg, DatesSetArg } from '@fullcalendar/angular';
import { createEventId } from 'src/app/event-utils';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AgendaService } from 'src/services/domian/agenda.service';
import { Agenda } from 'src/models/agenda.model';
import { API_CONFIG } from 'src/config/api.config';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { ModalAgendaComponent } from '../modal-agenda/modal-agenda.component';
import { ActivatedRoute } from '@angular/router';

// import momentPlugin from '@fullcalendar/moment';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(
    public agendaService: AgendaService,
    public dialog: MatDialog,

  ){ }




  
  url = `${API_CONFIG.baseUrl}/agendas`;
  calendarVisible = true;
  currentEvents: EventApi[] = [];
  salvaAgenda: Agenda;
  datasReservadas: Agenda[];  

    carregarDatas(){
      this.agendaService.buscarAgenda()
      .subscribe(data => {
        this.datasReservadas = data;
        console.log(this.datasReservadas);
      });
    }

  calendarOptions: CalendarOptions = {
    // plugins: [ dayGridPlugin],
    // titleFormat: 'dddd, MMMM D, YYYY',
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      start: 'prevYear,nexYear',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: false,
    // dateClick: this.handleDateClick.bind(this),
    eventSources: [{
      url: "http://localhost:8080/agendas",
      method: 'GET',
      extraParams: {
        title: 'nome',
        start: 'start',
        end: 'end',
        timeZone: 'start'
      }
    }],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.openDialog.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: 'pt-br',
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      list: 'Lista'
    },
    //eventRemove: this.handleDateHoraSelect.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  minhaUrl: any;

  ngOnInit(){

    this.carregarDatas();

  }


  // handleDateClick(arg){
  //   alert('date click! ' + arg.dateStr);
  // }

  handleDateSelect(selectInfo: DateSelectArg) {
    const nome = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Limpar seleção de data
    // let salvaAgenda;

    if (nome) {
      this.salvaAgenda = {
        // id: createEventId(),
        nome,
        inicio: selectInfo.startStr,
        fim: selectInfo.endStr,
        cpf: 'string',
        endereco: 'string',
        telefone: 'string',
        horaInicio: 'string',
        horaFim : 'string',
      };
      // calendarApi.addEvent({
      //   id: createEventId(),
      //   title,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay
      // });

      this.agendaService.salvarAgenda(this.salvaAgenda);
      this.ngOnInit();
    }

    // console.log(salvarAgendamento);
  }
  
  openDialog(selectInfo: DatesSetArg) {
    localStorage.setItem("StartStr", selectInfo.startStr);
    const dialogRef = this.dialog.open(ModalAgendaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleDateHoraSelect(selectInfo: DateSelectArg){
    

    // const data = prompt('favor digitar uma Data?');
    const nome = prompt('favor digitar seu nome?');
    let horaInicio = prompt('favor digitar hora?');
    let horaFim = prompt('favor digitar fim do hora?');
    const cpf = prompt('favor digitar CPF?');
    const endereco = prompt('favor digita seu endereço?')
    const telefone = prompt('favor digitar seu numero para contato?');

    console.log('hora= ', 'T' + horaInicio + ':00-03:00');
    const horaEscolida = 'T' + horaInicio + ':00-03:00' // T15:00:00-03:00
    horaFim = 'T' + horaFim + ':00-03:00';
    console.log('hora fim ', horaFim);
    if(nome && cpf){

      // hora = this.converterHora(hora);
      // selectInfo.endStr = 'null';
      this.salvaAgenda = {
        nome,
        inicio: selectInfo.startStr,
        fim: selectInfo.startStr,
        horaInicio,
        horaFim,
        cpf,
        endereco,
        telefone,
      };

      this.agendaService.salvarAgenda(this.salvaAgenda);
      this.ngOnInit();
    }
  }

  converterHora(horaS: string) {
    let horaCon = new Date();
    console.log(horaCon);
    console.log(Date.parse(horaS));
    return null;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Deseja excluir essa data? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  onClick() {
    alert('olá Brasil');
    // this.agendaService.salvarAgenda();
  }

  abrirModal(selectInfo: DatesSetArg) {

    console.log('selectInfo ', selectInfo);
  }



  //  str = formatDate('2020-11-04', {
  //     month: 'long',
  //     year: 'numeric',
  //     day: 'numeric',
  //     timeZoneName: 'short',
  //     timeZone: 'UTC',
  //     locale: 'br'
  //   });

  //   console.log(str);

  // "2020-11-19T13:00:00-03:00"

}


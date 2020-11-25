import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/models/agenda.model';
import { AgendaService } from 'src/services/domian/agenda.service';

@Component({
  selector: 'app-exibir',
  templateUrl: './exibir.component.html',
  styleUrls: ['./exibir.component.css']
})
export class ExibirComponent implements OnInit {

  constructor(
    public agendaService: AgendaService,
  ) { }

  datasReservadas: Agenda[] = [];

  datasDisponiveis: Agenda[] = [];

  ngOnInit(): void {
    this.carregarDatas();
    
  }


  carregarDatas(){
    this.agendaService.buscarAgenda()
    .subscribe(data => {
      this.datasReservadas = data;
      console.log(this.datasReservadas);
    });
  }

  carregarDatasDisponiveis(){
    this.agendaService.carregarDatasDisponiveis()
    .subscribe(data => {
      this.datasDisponiveis = data;
      console.log(this.datasDisponiveis);
    });
  }



}

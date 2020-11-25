import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Agenda } from 'src/models/agenda.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable()
export class AgendaService {
  static salvarAgenda(salvarAgendamento: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient){

  }

  buscarAgenda(): Observable<Agenda[]>{
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}/agendas`);
  }

  carregarDatasDisponiveis(){
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}/agendas`);
  }

  // tslint:disable-next-line: typedef
  salvarAgenda(agenda: Agenda ){

    return this.http.post(
      `${API_CONFIG.baseUrl}/agendas`,
      agenda).subscribe(resultado => {
        console.log(resultado)
      },
      erro => {
        if (erro.status == 400){
          console.log(erro)
        }
      }
      );
  }

  // salvarAgenda(){
  //   console.log('Olá Service!!!');
  // }
}

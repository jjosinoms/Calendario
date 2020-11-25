import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgendaService } from 'src/services/domian/agenda.service';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {


  agendaForm: FormGroup;
  salvoComSucesso = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public agendaService: AgendaService,
  ) { }

  ngOnInit(): void {

    this.initForm();

  }


  initForm() {

    let StartStr = localStorage.getItem("StartStr");
    this.agendaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      inicio: [StartStr, [Validators.required]],
      fim: [StartStr, [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFim: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      telefone: ['', [Validators.required]],


    });

  }


  criarCompromisso(){
    
    this.salvoComSucesso = true;
    this.agendaService.salvarAgenda(this.agendaForm.value);
    setTimeout(function(){
      window.location.reload();
   }, 3000);
   

}


}

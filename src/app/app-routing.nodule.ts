import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ExibirComponent } from './pages/exibir/exibir.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendario',
    pathMatch: 'full'
  },
  {
    path: 'calendario',
    component: AgendaComponent
  },
  {
    path: 'exibir',
    component: ExibirComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

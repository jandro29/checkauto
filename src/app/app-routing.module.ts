import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { MensajeComponent } from './views/mensaje/mensaje.component';

const routes: Routes = [
  { path: '', redirectTo: '#', pathMatch: 'full' },
  { path: 'index', component: IndexComponent},
  { path: 'mensaje', component: MensajeComponent},
  { path: '**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

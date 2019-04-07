import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { GameoverComponent } from './components/gameover/gameover.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'room/:name/:room', component: RoomComponent},
  {path: 'gameover', component: GameoverComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

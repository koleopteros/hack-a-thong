import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatSidenavModule, MatDividerModule, MatTabsModule, MatBadgeModule, MatSnackBarModule, MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { RoomComponent } from './components/room/room.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';

//Gate to backend, IMPORTANT DONT TOUCH or ill kick your butt
//im not familiar with this so please consult me first before
//modify this configuration
import { SocketIoModule} from 'ngx-socket-io'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainScreenComponent,
    RoomComponent,
    GameoverComponent,
    SideNavComponent,
    FooterComponent
  ],
  imports: [
    SocketIoModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTabsModule,
    MatDividerModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

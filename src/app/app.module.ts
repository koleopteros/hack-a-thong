import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatSidenavModule, MatDividerModule, MatTabsModule, MatBadgeModule, MatSnackBarModule, MatDialogModule, MatProgressBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './components/room/room.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';

import { SocketIoModule} from 'ngx-socket-io';
import { AboutComponent } from './components/about/about.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    GameoverComponent,
    SideNavComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    SocketIoModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
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

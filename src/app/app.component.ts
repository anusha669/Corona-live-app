import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoronaLive-app';

  stateReport: boolean = false;
  constructor(private router: Router) {
  }
  ngOnInit(){  }
 
  moveToStateComponent()
  {
    this.stateReport = true;
      this.router.navigate(['state/report']).then(()=>{console.log("state loaded")}).catch(console.error);
  }
}

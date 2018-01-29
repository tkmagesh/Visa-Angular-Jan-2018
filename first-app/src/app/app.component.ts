import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  changeTitle(){
  	console.log('A change title action triggered');
  	this.title = 'New App';
  }
}

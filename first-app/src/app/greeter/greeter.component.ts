import { Component } from '@angular/core';

@Component({
	selector : 'app-greeter',
	templateUrl : 'greeter.component.html'
})
export class GreeterComponent{
	message :string = '[Default Greet Message]'

	onGreetClick(username){
		this.message = `Hi ${username}, Have a nice day!`;
	} 
}
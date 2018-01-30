import { Component } from '@angular/core';
import { IBug } from './models/IBug';
import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl :'bugTracker.component.html'
})
export class BugTrackerComponent{

	bugs : IBug[] = [];
	
	constructor(private bugOperations : BugOperationsService){
		
	}

	onCreateNewClick(bugName : string){
		let newBug = this.bugOperations.createNew(bugName);
		this.bugs.push(newBug);
	}
	onBugNameClick(bug : IBug){
		this.bugOperations.toggle(bug);
	}
	onRemoveClosedClick(){
		for(let index = this.bugs.length-1; index >=0; index--){
			if (this.bugs[index].isClosed)
				this.bugs.splice(index, 1);
		}
	}
	getClosedCount(){
		let closedCount = 0;
		for(let index = 0, count = this.bugs.length; index < count; index++){
			if (this.bugs[index].isClosed)
				++closedCount;
		}
		return closedCount;
	}
}
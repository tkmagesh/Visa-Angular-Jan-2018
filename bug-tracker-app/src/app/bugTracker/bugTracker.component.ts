import { Component } from '@angular/core';
import { IBug } from './models/IBug';
import { BugStorageService } from './services/bugStorage.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl :'bugTracker.component.html'
})
export class BugTrackerComponent{

	bugs : IBug[] = [];
	
	newBugName : string = '';

	sortBugBy : string = 'name';

	sortBugDescending : boolean = false;

	constructor(private bugStorage : BugStorageService){
		this.bugs = this.bugStorage.getAll();
	}

	onCreateNewClick(){
		let newBug = this.bugStorage.addNew(this.newBugName);
		this.newBugName = '';
		this.bugs = [...this.bugs, newBug];
	}
	onBugNameClick(bugToToggle : IBug){
		let toggledBug = this.bugStorage.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}
	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => this.bugStorage.remove(closedBug))
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}
	
	
}
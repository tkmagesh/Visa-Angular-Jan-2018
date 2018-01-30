import { Component } from '@angular/core';
import { IBug } from './models/IBug';
import { BugStorageService } from './services/bugStorage.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl :'bugTracker.component.html'
})
export class BugTrackerComponent{

	bugs : IBug[] = [];
	
	bugToEdit : IBug ;
	

	sortBugBy : string = 'name';

	sortBugDescending : boolean = false;

	constructor(private bugStorage : BugStorageService){
		this.bugs = this.bugStorage.getAll();
	}

	onNewBugAdded(newBug:IBug){
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

	onBugEditSaveClick(newBugName){
		let editedBug = this.bugStorage.update(this.bugToEdit, {name : newBugName});
		this.bugs = this.bugs.map(bug => bug === this.bugToEdit ? editedBug : bug);
		this.bugToEdit = null;	
	}
	
	
}
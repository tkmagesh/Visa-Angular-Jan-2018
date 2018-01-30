import { Component, OnInit } from '@angular/core';
import { IBug } from './models/IBug';
import { BugStorageService } from './services/bugStorage.service';
import axios from 'axios';
import { BugServerService } from './services/bugServer.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl :'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{

	bugs : IBug[] = [];
	
	bugToEdit : IBug ;
	

	sortBugBy : string = 'name';

	sortBugDescending : boolean = false;

	constructor(private bugStorage : BugStorageService, private bugServer : BugServerService){
		
	}

	ngOnInit(){
		//this.bugs = this.bugStorage.getAll();
		this.bugServer
			.getAll()
			.then(bugs => this.bugs = bugs);

	}
	onNewBugAdded(newBug:IBug){
		this.bugs = [...this.bugs, newBug];
	}
	onBugNameClick(bugToToggle : IBug){
		this.bugServer
			.toggle(bugToToggle)
			.then(toggledBug => this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug));
	}
	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => this.bugServer
				.remove(closedBug)
				.then(() => this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id))
			);
	}

	onBugEditSaveClick(newBugName){
		this.bugServer
			.update(this.bugToEdit, {name : newBugName})
			.then(updatedBug => {
				this.bugs = this.bugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug);		
				this.bugToEdit = null;
			});
	}
	
	
}
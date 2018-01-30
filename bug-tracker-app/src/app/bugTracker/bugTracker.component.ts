import { Component, OnInit } from '@angular/core';
import { IBug } from './models/IBug';
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

	constructor(private bugServer : BugServerService){
		
	}

	async ngOnInit(){
		//this.bugs = this.bugStorage.getAll();
		/*this.bugServer
			.getAll()
			.then(bugs => this.bugs = bugs);*/
		this.bugs = await this.bugServer.getAll();
	}
	onNewBugAdded(newBug:IBug){
		this.bugs = [...this.bugs, newBug];
	}
	async onBugNameClick(bugToToggle : IBug){
		let toggledBug = await this.bugServer.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}
	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(async (closedBug) => {
				await this.bugServer.remove(closedBug);
				this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id);
			});
	}

	async onBugEditSaveClick(newBugName){
		let updatedBug = await this.bugServer.update(this.bugToEdit, {name : newBugName});
		this.bugs = this.bugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug);		
		this.bugToEdit = null;
	}
	
	
}
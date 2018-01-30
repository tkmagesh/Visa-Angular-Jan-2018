import { Injectable } from '@angular/core';
import { IBug } from '../models/IBug';
import { BugOperationsService } from './bugOperations.service';

@Injectable()
export class BugStorageService{
	private currentBugId = 0;
	private storage = window.localStorage;

	constructor(private bugOperations : BugOperationsService){

	}
	getAll() : IBug[]{
		let result : IBug[] = [];
		for(let index = 0, count = this.storage.length; index < count; index++){
			let key = this.storage.key(index),
				rawData = this.storage.getItem(key),
				bug = JSON.parse(rawData);
			this.currentBugId = this.currentBugId > bug.id ? this.currentBugId : bug.id;
			result.push(bug);
		}
		return result;
	}
	private save(bug : IBug) : void{
		this.storage.setItem(bug.id.toString(), JSON.stringify(bug));
	}
	addNew(bugName : string) : IBug{
		let newBug = this.bugOperations.createNew(bugName, ++this.currentBugId);
		this.save(newBug);
		return newBug;
	}
	toggle(bugToToggle : IBug) : IBug{
		let toggledBug = this.bugOperations.toggle(bugToToggle);
		this.save(toggledBug);
		return toggledBug;
	}
	remove(bug : IBug) : void {
		this.storage.removeItem(bug.id.toString());
	}
}
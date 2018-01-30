import { Component, Output, EventEmitter } from '@angular/core';
import { BugStorageService } from '../services/bugStorage.service';
import { IBug } from '../models/IBug';

@Component({
	selector : 'app-bug-edit',
	template : `
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" [(ngModel)]="newBugName">
			<input type="button" value="Create New" (click)="onCreateNewClick()">
		</section>
	`
})
export class BugEditComponent{
	newBugName : string = '';

	@Output()
	newBugAdded : EventEmitter<IBug> = new EventEmitter<IBug>();

	constructor(private bugStorage : BugStorageService){

	}
	
	onCreateNewClick(){
		let newBug = this.bugStorage.addNew(this.newBugName);
		this.newBugName = '';
		this.newBugAdded.emit(newBug);
	}
}
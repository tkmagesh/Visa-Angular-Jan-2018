import { IBug } from '../models/IBug';
import axios from 'axios';
import { BugOperationsService } from './bugOperations.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BugServerService{
	private baseUrl : string = 'http://localhost:3000/bugs';

	constructor(private bugOperations : BugOperationsService){

	}
	getAll() : Promise<IBug[]> {
		return axios
			.get(this.baseUrl)
			.then(response => response.data)		
	}
	addNew(bugName : string) : Promise<IBug>{
		let newBugData = this.bugOperations.createNew(bugName);
		return axios
			.post(this.baseUrl, newBugData)
			.then(response => response.data);
	}
	toggle(bugToToggle : IBug) : Promise<IBug>{
		let toggledBugData = this.bugOperations.toggle(bugToToggle);
		return axios
			.put(`${this.baseUrl}/${bugToToggle.id}`, toggledBugData)
			.then(response => response.data);	
	}
	remove(bugToRemove : IBug) : Promise<any>{
		return axios
			.delete(`${this.baseUrl}/${bugToRemove.id}`)
			.then(response => response.data);		
	}
	update(bug, data) : Promise<IBug>{
		let updatedBug = {...bug, ...data};
		return axios
			.put(`${this.baseUrl}/${updatedBug.id}`, updatedBug)
			.then(response => response.data);	
	}
}
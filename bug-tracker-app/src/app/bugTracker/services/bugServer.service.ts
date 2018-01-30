import { IBug } from '../models/IBug';
import { BugOperationsService } from './bugOperations.service';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class BugServerService{
	private baseUrl : string = 'http://localhost:3000/bugs';

	constructor(private bugOperations : BugOperationsService, private http : Http){

	}
	getAll() : Observable<IBug[]> {
		return this.http
			.get(this.baseUrl)
			.map(response => response.json())
	}
	addNew(bugName : string) : Observable<IBug>{
		let newBugData = this.bugOperations.createNew(bugName);
		return this.http
			.post(this.baseUrl, newBugData)
			.map(response => response.json());
	}
	toggle(bugToToggle : IBug) : Observable<IBug>{
		let toggledBugData = this.bugOperations.toggle(bugToToggle);
		return this.http
			.put(`${this.baseUrl}/${bugToToggle.id}`, toggledBugData)
			.map(response => response.json());	
	}
	remove(bugToRemove : IBug) : Observable<any>{
		return this.http
			.delete(`${this.baseUrl}/${bugToRemove.id}`)
			.map(response => response.json());		
	}
	update(bug, data) : Observable<IBug>{
		let updatedBug = {...bug, ...data};
		return this.http
			.put(`${this.baseUrl}/${updatedBug.id}`, updatedBug)
			.map(response => response.json());	
	}
}
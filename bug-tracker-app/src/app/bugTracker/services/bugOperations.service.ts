import { IBug } from '../models/IBug';

export class BugOperationsService{
	createNew(bugName : string, id : number = 0) : IBug {
		let newBug : IBug = {
			id : id,
			name : bugName,
			isClosed : false
		};
		return newBug;
	}
	toggle(bugToToggle : IBug) : IBug{
		let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
		return toggledBug;
	}
}
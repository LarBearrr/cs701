import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { CONTACTS } from './mock-data';

@Injectable({
	providedIn: 'root'
})
export class AddressProviderService {

	constructor() { }

	getFriends(): Contact[] {
		if (!window.localStorage.getItem('barker_contacts')) {
			window.localStorage.setItem('barker_contacts', JSON.stringify(CONTACTS));
		}
		return JSON.parse(window.localStorage.getItem('barker_contacts'));
	}

	getFriend(id: number): Contact {
		let friends: Contact[] = this.getFriends();
		let friend: Contact = friends.find(
			f => { return (f.id == id) });
		return friend;
	}

	addFriend(): Contact {
		let friends: Contact[] = this.getFriends();
		let maxId: number;

		if (friends && friends.length > 0) {
			maxId = friends[friends.length - 1].id;
		} else {
			maxId = 0;
		}

		let friend: Contact = new Contact();
		friend.id = maxId + 1;

		return friend;
	}

	saveFriend(friend: Contact): Contact {
		let contacts = this.getFriends();

		let index = contacts.findIndex(el => {
			return friend.id == el.id
		});

		if(index >= 0) {
			contacts.splice(index, 1, friend);
		} else {
			contacts.push(friend);
		}

		window.localStorage.setItem('barker_contacts', JSON.stringify(contacts));

		return friend;
	}

	removeFriend(id: Number) {
		let contacts = this.getFriends();

		let index = contacts.findIndex(el => {
			return id == el.id
		});

		if(index >= 0) {
			contacts.splice(index, 1);
		}

		window.localStorage.setItem('barker_contacts', JSON.stringify(contacts));

		return contacts;
	}

}

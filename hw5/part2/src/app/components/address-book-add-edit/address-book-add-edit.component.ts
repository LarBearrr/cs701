import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../../model/contact';
import { AddressProviderService } from
          '../../model/address-provider.service';

@Component({
  selector: 'app-address-book-add-edit',
  templateUrl: './address-book-add-edit.component.html',
  styleUrls: ['./address-book-add-edit.component.css']
})
export class AddressBookAddEditComponent implements OnInit {

	friend: Contact;
	title:  string;

  constructor(private route: ActivatedRoute, private router: Router,
  		private provider: AddressProviderService) { }

  ngOnInit() {

  	let id = this.route.snapshot.params['id'];
    if (id) {
        this.title = 'Edit Contact';
        this.friend = this.provider.getFriend(id);
    } else {
    	this.title = "Add Contact";
			this.friend = this.provider.addFriend();
		}

  }

  save() {
    if(this.provider.saveFriend(this.friend)) {
      this.router.navigate(['/']);
    };
  }

}

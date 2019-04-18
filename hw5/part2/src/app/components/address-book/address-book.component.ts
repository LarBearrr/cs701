import { Component, OnInit } from '@angular/core';

import { Contact } from '../../model/contact';
import { AddressProviderService } from
		'../../model/address-provider.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

	friends: Contact[];

  constructor(private provider: AddressProviderService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('friends')) {
      window.localStorage.setItem('friends', JSON.stringify(this.provider.getFriends()))
    }

  	this.friends = JSON.parse(window.localStorage.getItem('friends'));
  }

}

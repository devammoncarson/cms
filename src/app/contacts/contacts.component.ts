import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent
    .subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    )
  }

}

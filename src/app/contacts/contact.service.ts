import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id:string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
      }
      return null;
    }

    deleteContact(contact: Contact) {
      if (contact === null ) {
        return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
        return;
      }
  
      this.contacts.splice(pos, 1);
      this.contactChangedEvent.emit(this.contacts.slice());
    }

    addContact(newContact: Contact) {
      if(newContact == null || newContact == undefined){
        return;
      }
  
      this.maxContactId++;
      newContact.id = String(this.maxContactId);
      this.contacts.push(newContact);
      this.contactChangedEvent.next(this.contacts.slice());
    }
  
    updateContact(originalContact: Contact, newContact: Contact) {
      if(originalContact == null || originalContact == undefined ||
        newContact == null || newContact == undefined){
        return;
      }
  
      const pos = this.contacts.indexOf(originalContact);
      if(pos < 0) {
        return;
      }
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
  
      this.contactChangedEvent.next(this.contacts.slice());
    }

  }

import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http.get('https://mycmsfirebase.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice())
        });
    (error: any) => {
      console.log(error);
    }
    return this.contacts.slice();
  }

  storeContacts(contacts: Contact[]) {
    let stringToServer = JSON.stringify(this.contacts);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put('https://mycmsfirebase.firebaseio.com/contacts.json', stringToServer,{headers:header})
      .subscribe(result => {
        this.contactListChangedEvent.next(Object.assign(this.contacts));
      });
  }
 
  //     const headers = new HttpHeaders({"Content-Type":"application/json"});

  //   this.http.put('https://mycmsfirebase.firebaseio.com/contacts.json', contacts, {headers:headers})
  //     .subscribe(
  //       (response: Response) => {
  //       this.contactListChangedEvent.next(contacts.slice())
  //     }
  //   );
  // }

  getContact(id:string): Contact {
    for (const contact of this.contacts) {
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
      this.storeContacts(this.contacts);
    }

    getMaxId(): number {
      let maxId = 0;
      for (let contact of this.contacts){
        const currentId = parseInt(contact.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
      return maxId;
    }

    addContact(newContact: Contact) {
      if(newContact == null || newContact == undefined){
        return;
      }
      this.maxContactId++;
      newContact.id = String(this.maxContactId);
      this.contacts.push(newContact);
      this.storeContacts(this.contacts);
    }
  
    updateContact(originalContact: Contact, newContact: Contact) {
      if(originalContact == null || originalContact == undefined ||
        newContact == null || newContact == undefined) {
        return;
      }
  
      
      newContact.id = originalContact.id;
      const pos = this.contacts.indexOf(originalContact);
      if(pos < 0) {
        return;
      }
      this.contacts[pos] = newContact;
      this.storeContacts(this.contacts);
    }

  }

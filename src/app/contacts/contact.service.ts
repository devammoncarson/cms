import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from 'rxjs';
import 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Document[]>();
  contacts: Contact[] = [];
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get<{message: String, contacts: Contact[]}>('http://localhost:3000/contacts')
      .subscribe(
        //success function
        (contactsData) => {
          this.contacts = contactsData.contacts;
          console.log(this.contacts);
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.contacts.slice();
  }

  //OLD
  // getContacts(): Contact[] {
  //   this.http.get<Contact[]>('https://mycmsfirebase.firebaseio.com/contacts.json')
  //     .subscribe(
  //       (contacts: Contact[]) => {
  //         this.contacts = contacts;
  //         this.maxContactId = this.getMaxId();
  //         this.contacts.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
  //         this.contactListChangedEvent.next(this.contacts.slice())
  //       });
  //   (error: any) => {
  //     console.log(error);
  //   }
  //   return this.contacts.slice();
  // }

  storeContacts(contacts: Contact[]) {
    let stringToServer = JSON.stringify(this.contacts);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put('http://localhost:3000/contacts', stringToServer,{headers:header})
      .subscribe(result => {
        this.contactListChangedEvent.next(Object.assign(this.contacts));
      });
  }

  // OLD
  // storeContacts(contacts: Contact[]) { 
  //     const headers = new HttpHeaders({"Content-Type":"application/json"});

  //   this.http.put('https://mycmsfirebase.firebaseio.com/contacts.json', contacts, {headers:headers})
  //     .subscribe(
  //       (response: Response) => {
  //       this.contactListChangedEvent.next(contacts.slice())
  //     }
  //   );
  // }

  getContact(id: string){
    return this.http.get<{message: String, contact: Contact}>('http://localhost:3000/contacts/' + id);
  }

  // OLD
  // getContact(id: string): Contact {
  //   for (const contact of this.contacts) {
  //     if (contact.id === id) {
  //       return contact;
  //     }
  //   }
  //     return null;
  // }

  deleteContact(contact: Contact) {
    if (contact === null ) {
      return;
    }
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe(
      (response: Response) => {
        this.getContacts();
        //failed
});


  //OLD
    // deleteContact(contact: Contact) {
    //   if (contact === null ) {
    //     return;
    //   }
    //   const pos = this.contacts.indexOf(contact);
    //   if (pos < 0) {
    //     return;
    //   }
  
    //   this.contacts.splice(pos, 1);
    //   this.storeContacts(this.contacts);
    // }

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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    addContact(newContact: Contact) {
      if(!newContact){
        return;
      }

    //OLD
    // addContact(newContact: Contact) {
    //   if(newContact == null || newContact == undefined){
    //     return;
    //   }
    //   this.maxContactId++;
    //   newContact.id = String(this.maxContactId);
    //   this.contacts.push(newContact);
    //   this.storeContacts(this.contacts);
    // }
  
    updateContact(originalContact: Contact, newContact: Contact) {
      if(!originalContact || !newContact) {
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

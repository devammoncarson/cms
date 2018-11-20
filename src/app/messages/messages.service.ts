import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
  this.maxMessageId = this.getMaxId();  
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages){
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[] {
    this.http.get('https://mycmsfirebase.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a,b) => (a.id > b.id ) ? 1 : ((b.id > a.id) ? -1 : 0));
          this.messageListChangedEvent.next(this.messages.slice())
        });
    (error: any) => {
      console.log(error);
    }
    return this.messages.slice();
  }

  storeMessages(messages: Message[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    this.http.put('https://mycmsfirebase.firebaseio.com/messages.json', messages, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.messageListChangedEvent.next(messages.slice())
      }
    )
  }

  getMessage(id:string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return
    }
    this.maxMessageId++
    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage);
    this.storeMessages(this.messages);
  }
}

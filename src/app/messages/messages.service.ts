import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: Number;
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
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

  addMessage(message:Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}

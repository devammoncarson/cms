import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() selectedMessageEvent = new EventEmitter<Message>();

  messages: Message[] = [
    new Message('0002', 'Github', 'Have you gotten the repository backed up yet?', 'Brother Barzee'),
    new Message('0003', 'Github', 'Yes. I did it last night.', 'Brother Jackson'),
    new Message('0004', 'No one cares', 'Could you guys email each other, and not post to this forum?', 'Brother Thayne'),
    new Message('0005', 'Email...', "I'll email you about it...", 'Brother Jackson')
  ]

  constructor() { }

  ngOnInit() {
  }

    onAddMessage(message: Message) {
      this.messages.push(message);
    }
}

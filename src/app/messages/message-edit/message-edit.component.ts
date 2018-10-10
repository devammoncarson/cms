import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = "Ammon Carson";
  
  @ViewChild('subject') subjectInputReference: ElementRef;
  @ViewChild('msgText') msgTextInputReference: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputReference.nativeElement.value;
    const msgText = this.msgTextInputReference.nativeElement.value;
    const newMessage = new Message('0001', subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputReference.nativeElement.value = "";
    this.msgTextInputReference.nativeElement.value = "";
  }
}

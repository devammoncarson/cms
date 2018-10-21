import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  
  public currentSender: string = '1';
  
  @ViewChild('subject') subjectInputReference: ElementRef;
  @ViewChild('msgText') msgTextInputReference: ElementRef;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputReference.nativeElement.value;
    const msgText = this.msgTextInputReference.nativeElement.value;
    const newMessage = new Message('1', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputReference.nativeElement.value = "";
    this.msgTextInputReference.nativeElement.value = "";
  }
}

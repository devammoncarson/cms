import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  private subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentService.documentChangedEvent
       .subscribe(
         (documentsList: Document[]) => {
           this.documents = documentsList;
         }
       )
   }

}

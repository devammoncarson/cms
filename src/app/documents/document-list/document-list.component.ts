import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('0001', 'First Document', 'First Content', 'byui.edu', 'none'),
    new Document('0002', 'Second Document', 'Second Content', 'byui.edu', 'none'),
    new Document('0002', 'Third Document', 'Third Content', 'byui.edu', 'none'),
    new Document('0002', 'Fourth Document', 'Fourth Content', 'byui.edu', 'none'),
    new Document('0002', 'Fifth Document', 'Fifth Content', 'byui.edu', 'none')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}

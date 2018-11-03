import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents){
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document){
    if(newDocument === null || newDocument === undefined){
      return
    } 
    this.maxDocumentId++ 
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(originalDocument === null || newDocument === undefined || newDocument === null || originalDocument === undefined){
      return
    }
    newDocument.id = originalDocument.id;
    const pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


}

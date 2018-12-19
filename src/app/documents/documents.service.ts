import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model'
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get<{message: String, documents: Document[]}>('http://localhost:3000/documents')
      .subscribe(
        (documentData) => {
          this.documents = documentData.documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentListChangedEvent.next(this.documents.slice())
        });
    (error: any) => {
      console.log(error);
    }
    return this.documents.slice();
  }

  storeDocuments(documents: Document[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    this.http.put('http://localhost:3000/documents', documents, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.documentListChangedEvent.next(documents.slice())
      }
    );
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
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.getDocuments();
        });

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents){
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(!newDocument){
      return
    } 
    const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(originalDocument === null || newDocument === undefined ||
      newDocument === null || originalDocument === undefined) {
      return
    }

    newDocument.id = originalDocument.id;
    const pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }
    this.documents[pos] = newDocument;
    this.storeDocuments(this.documents);
  }


}

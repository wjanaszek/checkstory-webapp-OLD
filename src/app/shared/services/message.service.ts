import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface Message {
  type: { 'itemCreated', 'itemUpdated', 'itemDeleted', 'info', 'loadAll' };
  target: { 'photos', 'stories', 'photo', 'story' };
}

@Injectable()
export class MessageService {

  private subject: Subject<Message>;

  constructor() {
    this.subject = new Subject<Message>();
  }

  sendMessage(message: Message) {
    this.subject.next(message);
  }

  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }
}

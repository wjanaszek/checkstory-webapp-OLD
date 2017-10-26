import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

  private subject: Subject<any>;

  constructor() {
    this.subject = new Subject<any>();
  }

  sendMessage(message: any) {
    this.subject.next({ data: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

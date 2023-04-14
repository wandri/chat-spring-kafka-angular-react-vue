import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {Stomp} from 'stompjs/lib/stomp.js';
import {MessageService} from './message.service';
import {Message} from './message.interface';
import {User} from '../user/user.interface';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  user: User;

  @ViewChild('messageInput')
  messageInput: ElementRef;

  messages: Message[] = [];
  name = new UntypedFormControl('');
  ws: any;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.connect();
    this.messageService.getMessages().then((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.messageInput.nativeElement.focus());
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  connect() {
    let socket = new WebSocket(environment.webSocket);
    this.ws = Stomp.over(socket);
    this.ws.connect({}, () => {
      this.ws.subscribe('/chat', (frame: { body: string }) => {
        const message: Message = JSON.parse(frame.body);
        this.messages.push({...message, date: new Date(message.date)});
      });
    }, (error) => {
      alert('STOMP error ' + error);
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    console.warn('Disconnected');
  }

  send() {
    this.messageService.send({
      text: this.name.value,
      userId: this.user.id
    });
    this.name.setValue('');
  }

  isToday(date: Date) {
    const today = new Date();
    return date.getDate() == today.getDate()
      && date.getMonth() == today.getMonth()
      && date.getFullYear() == today.getFullYear();
  }

  isCurrentUser(userId: string) {
    return userId === this.user.id;
  }
}

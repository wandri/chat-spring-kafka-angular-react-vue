import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MessageService } from "./message.service";
import { Message } from "./message.interface";
import { User } from "../user/user.interface";
import { environment } from "../../environments/environment";
import { Client } from "@stomp/stompjs";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  user: User;

  @ViewChild("messageInput")
  messageInput: ElementRef;

  messages: Message[] = [];
  name = new FormControl<string>("");
  websocketClient: Client;

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

  connect(): void {
    this.websocketClient = this.initWebsocketClient(environment.webSocket, (body: string) => {
      const message: Message = JSON.parse(body);
      this.messages.push({ ...message, date: new Date(message.date) });
    });
    this.websocketClient.activate();
  }

  private initWebsocketClient(brokerURL: string, callBack: (body: string) => void): Client {
    return new Client({
      brokerURL: brokerURL,
      onConnect: () => {
        this.websocketClient.subscribe("/chat", (frame: { body: string }) => callBack(frame.body));
      }
    });
  }

  disconnect(): void {
    if (!!this.websocketClient) {
      this.websocketClient.deactivate().then(() => console.warn("Disconnected"));
    }
  }

  send(): void {
    this.messageService.send({
      text: this.name.value,
      userId: this.user.id
    }).then(() => this.name.setValue(""));
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() == today.getDate()
      && date.getMonth() == today.getMonth()
      && date.getFullYear() == today.getFullYear();
  }

  isCurrentUser(userId: string): boolean {
    return userId === this.user.id;
  }
}

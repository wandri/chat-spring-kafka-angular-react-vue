import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message } from "./message.interface";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {

  private server = environment.server;

  constructor(private http: HttpClient) {
  }

  getMessages(): Promise<Message[]> {
    return lastValueFrom(this.http.get<Message[]>(`${this.server}/messages`)
      .pipe(
        map((messages: Message[]) => messages.map(message => ({ ...message, date: new Date(message.date) })))
      ));
  }

  send(message: { text: string; userId: string }): Promise<Object> {
    return lastValueFrom(this.http.post(`${this.server}/messages/new`, message));
  }
}

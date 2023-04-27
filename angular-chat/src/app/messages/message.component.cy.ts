import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MockProvider } from "ng-mocks";
import { MessageService } from "./message.service";
import { User } from "../user/user.interface";
import { MessagesComponent } from "./messages.component";
import { Message } from "./message.interface";
import { Subject } from "rxjs";
import { MountResponse } from "cypress/angular";

const user: User = {
  name: "michael",
  id: "user_1"
};

const messages: Message[] = [
  {
    id: "id_1",
    text: "text_1",
    userId: user.id,
    userName: user.name,
    date: new Date(2023, 1, 2, 15, 5, 5)
  },
  {
    id: "id_2",
    text: "text_2",
    userId: "userId_2",
    userName: "userName_2",
    date: new Date(2023, 1, 3, 15, 5, 5)
  }
];
let websocketMessage: Subject<string>;
const newMessage = {
  id: "id_3",
  text: "text_3",
  userId: "userId_3",
  userName: "userName_3",
  date: new Date(50050000)
};

const imports = [CommonModule, FormsModule, ReactiveFormsModule];
const providers = [MockProvider(MessageService, {
  getMessages: () => Promise.resolve(messages),
  send: () => Promise.resolve(null)
})];
const config = {
  providers,
  imports,
  declarations: [],
  componentProperties: {
    user: user,
    initWebsocketClient: (brokerURL: string, callBack: (body: string) => void) => {
      websocketMessage.subscribe(() => callBack(JSON.stringify(newMessage)));
      return {
        deactivate: () => Promise.resolve(),
        activate: () => {
        }
      };
    }
  }
};

describe("Message component", () => {
  beforeEach(() => {
    websocketMessage = new Subject<string>();
    cy.mount(MessagesComponent, config).then((wrapper) => {
      return cy.wrap(wrapper).as("angular");
    });
  });

  it("display the messages given by the service", () => {
    const actualMessage = [];
    cy.get(".messages .message").each(($messageElement) => {
      const userName = $messageElement[0].querySelector(".user-name")?.textContent.trim();
      const date = $messageElement[0].querySelector(".message-date").textContent.trim();
      const text: string = $messageElement[0].querySelector(".text").textContent.trim();
      actualMessage.push({ userName, date, text });
    }).then(() => {
      expect(actualMessage).to.deep.equal([
        {
          date: "02 Feb 2023",
          text: messages[0].text,
          userName: undefined
        },
        {
          userName: messages[1].userName,
          date: "03 Feb 2023",
          text: messages[1].text
        }
      ]);
    });
  });

  it("Update the messages with the upcoming messages", () => {
    cy.get<MountResponse<MessagesComponent>>("@angular").then(wrap => {
      websocketMessage.next("event");
      return wrap.fixture.whenStable();
    });
    cy.get(".messages .message").last().then(($messageElement) => {
      const userName = $messageElement[0].querySelector(".user-name")?.textContent.trim();
      const text: string = $messageElement[0].querySelector(".text").textContent.trim();
      expect(userName).to.equal(newMessage.userName);
      expect(text).to.equal(newMessage.text);
    });
  });
});

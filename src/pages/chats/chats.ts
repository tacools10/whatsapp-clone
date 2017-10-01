import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import * as moment from 'moment';
import {Chat, MessageType} from 'api/models';
import {Chats} from "api/collections/chats";
import {Messages} from "api/collections/messages";


@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {

  chats;

  constructor() {
  }

  ngOnInit() {
    this.chats = Chats
      .find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          ...chats.map((chat: Chat) =>
            Messages
              .find({chatId: chat._id})
              .startWith(null)
              .map(messages => {
                if (messages) chat.lastMessage = messages[0];
                return chat;
              })
          )
        )
      ).zone();
  }

  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
  }

}

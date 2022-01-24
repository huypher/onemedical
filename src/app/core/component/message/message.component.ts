import {Component, Input, OnInit} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  @Input() type: string = ''
  @Input() content: string = ''

  ngOnInit() {
    this.createMessage(this.type, this.content)
  }

  createMessage(type: string, content: string): void {
    if (this.type === '') {
      return
    }
    this.message.create(type, content);
  }

  constructor(private message: NzMessageService) {}
}

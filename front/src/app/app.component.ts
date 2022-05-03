import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;

  isSendbuttonAbvailabe = false;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
  }

  connect() {
    this.webSocketAPI._connect();
    this.isSendbuttonAbvailabe = true;
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}

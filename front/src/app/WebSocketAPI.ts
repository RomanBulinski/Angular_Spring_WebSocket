import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AppComponent} from './app.component';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;
  appComponent: AppComponent;

  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    // const _this = this;
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.topic, sdkEvent => {
        console.log("4444444444444444444444-----------------");
        this.onMessageReceived(sdkEvent);
      });
      console.log("33333333333333333333333-----------------");
      this.stompClient.reconnect_delay = 100;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log("000000000");
    console.log(this.stompClient);
    if (this.stompClient !== null || this.stompClient !== undefined) {
      console.log("111111111111111111111");
      console.log('calling logout api via web socket');
      this.stompClient.send('/app/hello', {}, JSON.stringify(message));
    } else if (this.stompClient === null || this.stompClient !== undefined) {
      console.log('Brak połaczenia ze skarpetka');
    }
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
    this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}

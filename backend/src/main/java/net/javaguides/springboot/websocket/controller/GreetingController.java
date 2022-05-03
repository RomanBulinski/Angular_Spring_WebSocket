package net.javaguides.springboot.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import net.javaguides.springboot.websocket.model.Greeting;
import net.javaguides.springboot.websocket.model.HelloMessage;

@Controller
public class GreetingController {
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(5000); // simulated delay
        if(message.getName().equals("aaa")){
            return new Greeting("Spadaj!!!!");
        }else{
            return new Greeting("Hello1111, " + HtmlUtils.htmlEscape(message.getName()) + "!");
        }
    }
}

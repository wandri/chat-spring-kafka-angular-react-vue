package com.wandrilleCorp.doodleapi.api.message;

import com.wandrilleCorp.doodleapi.application.MessageManager;
import com.wandrilleCorp.doodleapi.domain.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MessageController {
    private final MessageManager messageManager;

    @Autowired
    public MessageController(
            MessageManager messageManager
    ) {
        this.messageManager = messageManager;
    }

    @MessageMapping("/messages")
    @SendTo("/topic/messages")
    public List<Message> getMessages() throws Exception {
        return messageManager.getAllMessages();
    }

}

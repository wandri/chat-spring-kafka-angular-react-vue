package com.wandrillecorp.chatapi.api.message;

import com.wandrillecorp.chatapi.application.MessageManager;
import com.wandrillecorp.chatapi.domain.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173","http://localhost:3000"}, maxAge = 3600)
@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageManager messageManager;

    @Autowired
    public MessageController(
            MessageManager messageManager) {
        this.messageManager = messageManager;
    }

    @GetMapping()
    public List<Message> getMessages() throws Exception {
        return messageManager.getAllMessages();
    }

    @PostMapping("/new")
    public void addNewMessage(
            @Valid @RequestBody MessageCreatedCommand command
    ) {
        try {
            Message message = messageManager.save(command.getUserId(), command.getText());
            messageManager.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

package com.wandrilleCorp.doodleapi.api.message;

import com.wandrilleCorp.doodleapi.application.MessageManager;
import com.wandrilleCorp.doodleapi.domain.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageManager messageManager;

    @Autowired
    public MessageController(
            MessageManager messageManager
    ) {
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
            messageManager.save(command.getUserId(), command.getText());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

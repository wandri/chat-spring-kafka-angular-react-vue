package com.wandrilleCorp.doodleapi.application;

import com.wandrilleCorp.doodleapi.domain.message.Message;
import com.wandrilleCorp.doodleapi.domain.message.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageManager {
    private MessageRepository messageRepository;

    public MessageManager(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAllOrderByDate();
    }
}

package com.wandrilleCorp.doodleapi.application;

import com.wandrilleCorp.doodleapi.domain.message.Message;
import com.wandrilleCorp.doodleapi.domain.message.MessageRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
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

    public void save(String userId, String text) {
        messageRepository.save(new Message("plop", userId, text, Date.from(Instant.now())));
    }
}

package com.wandrilleCorp.doodleapi.application;

import com.wandrilleCorp.doodleapi.domain.bus.ChatMessageBus;
import com.wandrilleCorp.doodleapi.domain.message.Message;
import com.wandrilleCorp.doodleapi.domain.message.MessageRepository;
import com.wandrilleCorp.doodleapi.domain.user.User;
import com.wandrilleCorp.doodleapi.domain.user.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.List;

@Service
public class MessageManager {
    private MessageRepository messageRepository;
    private UserRepository userRepository;
    private ChatMessageBus chatMessageBus;

    public MessageManager(
            MessageRepository messageRepository,
            UserRepository userRepository,
            ChatMessageBus chatMessageBus
    ) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.chatMessageBus = chatMessageBus;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAllOrderByDate();
    }

    public Message save(String userId, String text) {
        User user = userRepository.find(userId);
        if (user != null) {
            return messageRepository.save(new Message(user.getName(), userId, text, Date.from(Instant.now())));
        } else {
            throw new IllegalStateException();
        }
    }

    public void send(Message message) {
        chatMessageBus.emit(message);
    }
}

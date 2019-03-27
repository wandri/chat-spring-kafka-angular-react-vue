package com.wandrillecorp.chatapi.infrastructure.messageBus;

import com.wandrillecorp.chatapi.domain.message.Message;
import com.wandrillecorp.avro.message.MessageAvro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class KafkaEventHandler {

    private SimpMessagingTemplate template;

    @Autowired
    public KafkaEventHandler(SimpMessagingTemplate template) {
        this.template = template;
    }

    @KafkaListener(topics = "chat")
    public void listen(MessageAvro messageAvro) {
        Message message = new Message(messageAvro.getId(), messageAvro.getUserName(),
                messageAvro.getUserId(), messageAvro.getText(), new Date(Long.valueOf(messageAvro.getDate())));
        template.convertAndSend("/chat", message);
    }

}

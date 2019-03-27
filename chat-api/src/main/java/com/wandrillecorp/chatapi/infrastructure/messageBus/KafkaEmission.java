package com.wandrillecorp.chatapi.infrastructure.messageBus;

import com.wandrillecorp.chatapi.domain.bus.ChatMessageBus;
import com.wandrillecorp.chatapi.domain.message.Message;
import com.wandrillecorp.avro.message.MessageAvro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaEmission implements ChatMessageBus {

    private final KafkaTemplate<String, MessageAvro> kafkaTemplate;

    @Autowired
    public KafkaEmission(KafkaTemplate<String, MessageAvro> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void emit(Message message) {
        MessageAvro messageAvro = new MessageAvro(message.getId(), message.getText(), message.getUserId(),
                message.getUserName(),  message.getDate().getTime());
        kafkaTemplate.send("chat", messageAvro);
    }
}

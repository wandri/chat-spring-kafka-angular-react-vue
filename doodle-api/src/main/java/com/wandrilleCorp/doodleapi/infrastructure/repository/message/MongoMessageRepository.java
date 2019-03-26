package com.wandrilleCorp.doodleapi.infrastructure.repository.message;

import com.wandrilleCorp.doodleapi.domain.message.Message;
import com.wandrilleCorp.doodleapi.domain.message.MessageRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MongoMessageRepository implements MessageRepository {

    private DefaultMongoMessageRepository defaultMongMessageRepository;

    public MongoMessageRepository(DefaultMongoMessageRepository defaultMongMessageRepository) {
        this.defaultMongMessageRepository = defaultMongMessageRepository;
    }

    @Override
    public Message save(Message message) {
        return defaultMongMessageRepository.save(message);
    }

    @Override
    public List<Message> findAllOrderByDate() {
        return defaultMongMessageRepository.findAllOrderByDate();
    }
}

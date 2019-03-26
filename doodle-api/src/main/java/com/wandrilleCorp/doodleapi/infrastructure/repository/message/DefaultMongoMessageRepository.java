package com.wandrilleCorp.doodleapi.infrastructure.repository.message;

import com.wandrilleCorp.doodleapi.domain.message.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DefaultMongoMessageRepository extends MongoRepository<Message, String> {
}

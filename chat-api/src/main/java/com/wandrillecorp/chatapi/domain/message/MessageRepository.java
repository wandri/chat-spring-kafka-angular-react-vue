package com.wandrillecorp.chatapi.domain.message;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository {
    Message save(Message message);

    List<Message> findAllOrderByDate();
}

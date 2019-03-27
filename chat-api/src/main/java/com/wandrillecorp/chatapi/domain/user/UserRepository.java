package com.wandrillecorp.chatapi.domain.user;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
    User findByName(String userName);

    User find(String id);

    User save(String userName);
}

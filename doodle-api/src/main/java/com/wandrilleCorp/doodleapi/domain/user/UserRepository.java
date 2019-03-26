package com.wandrilleCorp.doodleapi.domain.user;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
    User findByName(String userName);

    User find(String id);

    User save(String userName);
}

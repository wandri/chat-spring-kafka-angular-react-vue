package com.wandrilleCorp.doodleapi.infrastructure.repository.user;

import com.wandrilleCorp.doodleapi.domain.user.User;
import com.wandrilleCorp.doodleapi.domain.user.UserRepository;
import org.springframework.stereotype.Repository;

@Repository
public class MongoUserRepository implements UserRepository {

    private DefaultMongoUserRepository defaultMongoUserRepository;

    public MongoUserRepository(DefaultMongoUserRepository defaultMongoUserRepository) {
        this.defaultMongoUserRepository = defaultMongoUserRepository;
    }

    @Override
    public User findByName(String userName) {
        return defaultMongoUserRepository.findByName(userName);
    }

    @Override
    public User save(String userName) {
        return defaultMongoUserRepository.save(new User(null, userName));
    }
}

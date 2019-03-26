package com.wandrilleCorp.doodleapi.application;

import com.wandrilleCorp.doodleapi.domain.user.User;
import com.wandrilleCorp.doodleapi.domain.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserManager {

    private UserRepository userRepository;

    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOrCreateUser(String userName) {
        User existingUser = userRepository.findByName(userName);
        if (existingUser != null) {
            return existingUser;
        } else {
            return userRepository.save(userName);
        }
    }

}

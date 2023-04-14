package com.wandrillecorp.chatapi.api.user;

import com.wandrillecorp.chatapi.application.UserManager;
import com.wandrillecorp.chatapi.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173","http://localhost:3000"}, maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserManager userManager;

    @Autowired
    public UserController(UserManager userManager) {
        this.userManager = userManager;
    }

    @PostMapping()
    public User createUser(
            @Valid @RequestBody UserCreatedCommand command
    ) {
        try {
            return this.userManager.findOrCreateUser(command.getName());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "An error has occurred, sorry.");
        }
    }
}

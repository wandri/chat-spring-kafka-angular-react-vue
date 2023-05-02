package com.wandrillecorp.chatapi.api.user;


import jakarta.validation.constraints.NotNull;

public class UserCreatedCommand {
    @NotNull
    private String name;

    public UserCreatedCommand() {
    }

    public UserCreatedCommand(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

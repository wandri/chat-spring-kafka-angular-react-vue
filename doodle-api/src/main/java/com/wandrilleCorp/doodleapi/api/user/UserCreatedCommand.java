package com.wandrilleCorp.doodleapi.api.user;

import javax.validation.constraints.NotNull;

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

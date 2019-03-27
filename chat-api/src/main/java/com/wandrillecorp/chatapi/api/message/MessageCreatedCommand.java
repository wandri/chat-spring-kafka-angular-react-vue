package com.wandrillecorp.chatapi.api.message;

import javax.validation.constraints.NotNull;

public class MessageCreatedCommand {
    @NotNull
    private String text;
    @NotNull
    private String userId;

    public MessageCreatedCommand(String text, String userId) {
        this.text = text;
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public String getUserId() {
        return userId;
    }
}

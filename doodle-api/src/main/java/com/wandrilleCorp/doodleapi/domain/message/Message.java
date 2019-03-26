package com.wandrilleCorp.doodleapi.domain.message;

import com.wandrilleCorp.doodleapi.domain.ValueObject;

import java.io.Serializable;
import java.util.Date;

public class Message extends ValueObject implements Serializable {
    private String id;
    private String userName;
    private String userId;
    private String text;
    private Date date;

    public Message() {
    }

    public Message(String id, String userName, String userId, String text, Date date) {
        this.id = id;
        this.userName = userName;
        this.userId = userId;
        this.text = text;
        this.date = date;
    }

    public Message(String userName, String userId, String text, Date date) {
        this(null, userName, userId, text, date);
    }

    public String getUserName() {
        return userName;
    }

    public String getUserId() {
        return userId;
    }

    public String getText() {
        return text;
    }

    public Date getDate() {
        return date;
    }

    public String getId() {
        return id;
    }
}

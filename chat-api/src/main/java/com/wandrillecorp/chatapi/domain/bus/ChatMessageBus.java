package com.wandrillecorp.chatapi.domain.bus;

import com.wandrillecorp.chatapi.domain.message.Message;

public interface ChatMessageBus {
    void emit(Message message);
}

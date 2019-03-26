package com.wandrilleCorp.doodleapi.domain.bus;

import com.wandrilleCorp.doodleapi.domain.message.Message;

public interface ChatMessageBus {
    void emit(Message message);
}

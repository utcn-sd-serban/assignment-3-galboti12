package ro.utcn.sd.boti.stackoverflow.event;

import lombok.Data;

@Data
public class BaseEvent {
    private final EventType type;
}

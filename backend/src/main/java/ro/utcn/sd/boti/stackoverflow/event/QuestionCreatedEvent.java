package ro.utcn.sd.boti.stackoverflow.event;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.utcn.sd.boti.stackoverflow.dto.QuestionDTO;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionCreatedEvent extends BaseEvent{
    private final QuestionDTO question;

    public QuestionCreatedEvent(QuestionDTO question) {
        super(EventType.QUESTION_CREATED);
        this.question = question;
    }
}

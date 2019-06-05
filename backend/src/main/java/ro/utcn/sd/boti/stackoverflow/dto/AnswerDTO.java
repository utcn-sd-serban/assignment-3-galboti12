package ro.utcn.sd.boti.stackoverflow.dto;

import lombok.Data;
import ro.utcn.sd.boti.stackoverflow.entity.Answer;

@Data
public class AnswerDTO {
    private Integer id;
    private String author;
    private String text;
    private String time;

    public static AnswerDTO ofEntity(Answer answer) {
        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setId(answer.getId());
        answerDTO.setAuthor(answer.getAuthor().getUsername());
        answerDTO.setText(answer.getText());
        answerDTO.setTime(answer.getTime());
        return answerDTO;
    }
}

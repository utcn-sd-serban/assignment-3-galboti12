package ro.utcn.sd.boti.stackoverflow.dto;

import lombok.Data;
import org.springframework.util.CollectionUtils;
import ro.utcn.sd.boti.stackoverflow.entity.Answer;
import ro.utcn.sd.boti.stackoverflow.entity.Question;
import ro.utcn.sd.boti.stackoverflow.entity.Tag;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuestionDTO {
    private Integer id;
    private String author;
    private String title;
    private String text;
    private String time;
    private List<String> tags;
    private List<Integer> answerIds;

    public static QuestionDTO ofEntity(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.id = question.getId();
        questionDTO.author = question.getAuthor().getUsername();
        questionDTO.title = question.getTitle();
        questionDTO.text = question.getText();
        questionDTO.time = question.getTime();
        if (!CollectionUtils.isEmpty(question.getTags())) {
            questionDTO.setTags(question.getTags().stream()
                    .map(Tag::getName)
                    .collect(Collectors.toList()));
        } else {
            questionDTO.setTags(new ArrayList<>());
        }
        if (!CollectionUtils.isEmpty(question.getAnswers())) {
            questionDTO.setAnswerIds(question.getAnswers().stream()
                    .map(Answer::getId)
                    .collect(Collectors.toList()));
        } else {
            questionDTO.setAnswerIds(new ArrayList<>());
        }
        return questionDTO;
    }
}

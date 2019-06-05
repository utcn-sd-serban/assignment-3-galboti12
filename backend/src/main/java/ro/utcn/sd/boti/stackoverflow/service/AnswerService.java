package ro.utcn.sd.boti.stackoverflow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.boti.stackoverflow.dto.AnswerDTO;
import ro.utcn.sd.boti.stackoverflow.entity.Answer;
import ro.utcn.sd.boti.stackoverflow.entity.Question;
import ro.utcn.sd.boti.stackoverflow.exception.QuestionNotFoundException;
import ro.utcn.sd.boti.stackoverflow.repository.RepositoryFactory;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final RepositoryFactory repositoryFactory;
    private final SUserDetailsService sUserDetailsService;

    @Transactional
    public AnswerDTO addAnswer(Integer questionId, AnswerDTO answerDTO) {
        Question question = repositoryFactory.getQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        if (question == null) return new AnswerDTO();
        Answer answer = new Answer(sUserDetailsService.loadCurrentUser(), question,
                answerDTO.getText(), new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        question.getAnswers().add(answer);
        repositoryFactory.getQuestionRepository().save(question);
        return AnswerDTO.ofEntity(repositoryFactory.getAnswerRepository().save(answer));
    }

    @Transactional
    public List<AnswerDTO> getAnswers(Integer questionId) {
        Question question = repositoryFactory.getQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        return question.getAnswers().stream()
                .map(AnswerDTO::ofEntity)
                .collect(Collectors.toList());
    }
}

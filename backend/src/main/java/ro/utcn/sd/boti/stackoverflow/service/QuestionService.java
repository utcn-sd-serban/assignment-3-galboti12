package ro.utcn.sd.boti.stackoverflow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.boti.stackoverflow.dto.QuestionDTO;
import ro.utcn.sd.boti.stackoverflow.entity.Question;
import ro.utcn.sd.boti.stackoverflow.entity.Tag;
import ro.utcn.sd.boti.stackoverflow.event.QuestionCreatedEvent;
import ro.utcn.sd.boti.stackoverflow.exception.QuestionNotFoundException;
import ro.utcn.sd.boti.stackoverflow.exception.TagNotFoundException;
import ro.utcn.sd.boti.stackoverflow.repository.RepositoryFactory;
import ro.utcn.sd.boti.stackoverflow.repository.TagRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final RepositoryFactory repositoryFactory;
    private final SUserDetailsService sUserDetailsService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public List<QuestionDTO> listQuestions() {
        List<Question> questions = repositoryFactory.getQuestionRepository().findAll();
        questions.sort(Comparator.comparing(Question::getTime).reversed());
        return questions.stream().
                map(QuestionDTO::ofEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public QuestionDTO addQuestion(QuestionDTO questionDTO) {
        Question question = new Question(sUserDetailsService.loadCurrentUser(), questionDTO.getTitle(), questionDTO.getText(),
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        TagRepository tagRepository = repositoryFactory.getTagRepository();
        List<Tag> tagList = new ArrayList<>();
        for (String tagName : questionDTO.getTags()) {
            if (tagName.length() > 2) {
                Tag tag = new Tag(tagName);
                question.getTags().add(tag);
                tag.getQuestions().add(question);
                tagList.add(tagRepository.save(tag));
            }
        }
        QuestionDTO output = QuestionDTO.ofEntity(repositoryFactory.getQuestionRepository().save(question));
        eventPublisher.publishEvent(new QuestionCreatedEvent(output));
        return output;
    }

    @Transactional
    public List<QuestionDTO> searchInTitle(String s) {
        List<Question> questions = repositoryFactory.getQuestionRepository().findByText(s);
        return questions.stream()
                .map(QuestionDTO::ofEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<QuestionDTO> searchByTag(String tagName) {
        Tag tag = repositoryFactory.getTagRepository().findByName(tagName).orElseThrow(TagNotFoundException::new);
        if (tag != null) {
            List<Question> questions = tag.getQuestions();
            return questions.stream()
                    .map(QuestionDTO::ofEntity)
                    .collect(Collectors.toList());
        } else return new ArrayList<QuestionDTO>();
    }

    @Transactional
    public QuestionDTO findById(int id) {
        return QuestionDTO.ofEntity(repositoryFactory.getQuestionRepository().findById(id).orElseThrow(QuestionNotFoundException::new));
    }
}

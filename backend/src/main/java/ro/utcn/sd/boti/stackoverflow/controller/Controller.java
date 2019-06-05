package ro.utcn.sd.boti.stackoverflow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import ro.utcn.sd.boti.stackoverflow.dto.AnswerDTO;
import ro.utcn.sd.boti.stackoverflow.dto.QuestionDTO;
import ro.utcn.sd.boti.stackoverflow.dto.SUserDTO;
import ro.utcn.sd.boti.stackoverflow.event.BaseEvent;
import ro.utcn.sd.boti.stackoverflow.service.AnswerService;
import ro.utcn.sd.boti.stackoverflow.service.QuestionService;
import ro.utcn.sd.boti.stackoverflow.service.SUserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class Controller {
    private final QuestionService questionService;
    private final SUserService sUserService;
    private final AnswerService answerService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/questions")
    public List<QuestionDTO> readAllQuestions() {
        return questionService.listQuestions();
    }

    @PostMapping("/questions")
    public QuestionDTO createQuestion(@RequestBody QuestionDTO dto) {
        return questionService.addQuestion(dto);
    }

    @GetMapping("/filter-by-text/{text}")
    public List<QuestionDTO> filterByText(@PathVariable String text) {
        return questionService.searchInTitle(text);
    }

    @GetMapping("/filter-by-tag/{tag}")
    public List<QuestionDTO> filterByTag(@PathVariable String tag) {
        return questionService.searchByTag(tag);
    }

    @PostMapping("/create-user")
    public SUserDTO createUser(@RequestBody SUserDTO dto) {
        return sUserService.addUser(dto);
    }

    @GetMapping("/show-question/{questionId}")
    public List<AnswerDTO> getAnswers(@PathVariable Integer questionId) {
        return answerService.getAnswers(questionId);
    }

    @PostMapping("/show-question/{questionId}")
    public AnswerDTO answerQuestion(@PathVariable Integer questionId, @RequestBody AnswerDTO dto) {
        return answerService.addAnswer(questionId, dto);
    }

    @PutMapping("/show-question/{questionId}")
    public QuestionDTO getSelectedQuestion(@PathVariable Integer questionId) {
        return questionService.findById(questionId);
    }

    @EventListener(BaseEvent.class)
    public void handleQuestioncreated(BaseEvent event){
        System.out.println("Got an event: " + event);
        messagingTemplate.convertAndSend("/topic/events", event);
    }
}

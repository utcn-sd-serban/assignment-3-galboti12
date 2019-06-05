package ro.utcn.sd.boti.stackoverflow.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
//@ToString(of = {"id", "title", "text", "time", "vote"})
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author")
    private SUser author;

    private String title;
    private String text;
    private String time;
    private Integer vote;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    public Question(SUser author, String title, String text, String time){
        this.author = author;
        this.title = title;
        this.text = text;
        this.time = time;
        this.vote = 0;
    }

    public String toString(){
        return new String("id = " + id + ", autor = " + (author == null ? "null" : author.getUsername()) + ", title = " + title);
    }
}

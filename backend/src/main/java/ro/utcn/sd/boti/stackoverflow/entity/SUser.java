package ro.utcn.sd.boti.stackoverflow.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class SUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private Integer is_admin;

    @OneToMany(mappedBy = "author")
    private List<Question> questions = new ArrayList<>();

    public SUser(String username, String password, Integer is_admin) {
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
    }
}

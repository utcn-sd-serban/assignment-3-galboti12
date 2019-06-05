package ro.utcn.sd.boti.stackoverflow.repository.jdbc;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import ro.utcn.sd.boti.stackoverflow.entity.SUser;
import ro.utcn.sd.boti.stackoverflow.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class JdbcUserRepository implements UserRepository {

    private final JdbcTemplate template;

    @Override
    public SUser save(SUser entity) {
        if (entity.getId() == null) {
            entity.setId(insert(entity));
        } else {
            update(entity);
        }
        return entity;
    }

    @Override
    public void remove(SUser entity) {template.update("DELETE FROM user WHERE id = ?", entity.getId()); }

    @Override
    public Optional<SUser> findById(int id) {
        List<SUser> result = template.query("SELECT * FROM user WHERE id = ?", new UserMapper(), id);
        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    @Override
    public List<SUser> findAll() {
        return template.query("SELECT * FROM user", new UserMapper());
    }

    @Override
    public Optional<SUser> findByUserName(String s) {
         List<SUser> result = template.query("SELECT * FROM user WHERE username = ?", new UserMapper(), s);
         return result.isEmpty() ? Optional.empty() : Optional.ofNullable(result.get(0));
    }

    private int insert(SUser user) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(template);
        insert.setTableName("user");
        insert.usingGeneratedKeyColumns("id");
        Map<String, Object> map = new HashMap<>();
        map.put("username", user.getUsername());
        map.put("password", user.getPassword());
        map.put("is_admin", user.getIs_admin());
        map.put("is_banned", 0);
        map.put("score", 0);
        return insert.executeAndReturnKey(map).intValue();
    }

    private void update(SUser user) {
        template.update("UPDATE user SET username = ?, password = ?, is_admin = ? WHERE id = ?",
                user.getUsername(), user.getPassword(), user.getIs_admin(), user.getId());
    }
}

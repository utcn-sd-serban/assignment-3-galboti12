package ro.utcn.sd.boti.stackoverflow.repository.jdbc;

import org.springframework.jdbc.core.RowMapper;
import ro.utcn.sd.boti.stackoverflow.entity.SUser;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<SUser> {

    @Override
    public SUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        SUser user = new SUser();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setIs_admin(rs.getInt("is_admin"));
        return user;
    }

}
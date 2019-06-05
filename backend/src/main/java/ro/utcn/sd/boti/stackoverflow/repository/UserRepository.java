package ro.utcn.sd.boti.stackoverflow.repository;

import ro.utcn.sd.boti.stackoverflow.entity.SUser;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    SUser save(SUser entity);
    void remove(SUser entity);
    Optional<SUser> findById(int id);
    List<SUser> findAll();
    Optional<SUser> findByUserName(String username);
}

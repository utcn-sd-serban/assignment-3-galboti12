package ro.utcn.sd.boti.stackoverflow.repository.memory;

import ro.utcn.sd.boti.stackoverflow.entity.SUser;
import ro.utcn.sd.boti.stackoverflow.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class InMemoryUserRepository implements UserRepository {

    private final Map<Integer, SUser> data = new ConcurrentHashMap<>();
    private final AtomicInteger currentId = new AtomicInteger(0);

    @Override
    public SUser save(SUser user) {
        if (user.getId() == null) {
            user.setId(currentId.incrementAndGet());
        }
        data.put(user.getId(), user);
        return user;
    }

    @Override
    public void remove(SUser user) {
        data.remove(user.getId());
    }

    @Override
    public Optional<SUser> findById(int id) {
        return Optional.ofNullable(data.get(id));
    }

    @Override
    public List<SUser> findAll() {
        return new ArrayList<>(data.values());
    }

    @Override
    public Optional<SUser> findByUserName(String username) {
        for (SUser user : data.values()) {
            if (user.getUsername().toLowerCase().equals(username.toLowerCase())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}

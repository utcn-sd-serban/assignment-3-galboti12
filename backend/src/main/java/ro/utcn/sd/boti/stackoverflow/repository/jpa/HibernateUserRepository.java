package ro.utcn.sd.boti.stackoverflow.repository.jpa;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.boti.stackoverflow.entity.SUser;
import ro.utcn.sd.boti.stackoverflow.repository.UserRepository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class HibernateUserRepository implements UserRepository {
    private final EntityManager entityManager;

    @Override
    public SUser save(SUser entity) {
        if (entity.getId() == null) {
            entityManager.persist(entity);
            return entity;
        } else {
            return entityManager.merge(entity);
        }
    }

    @Override
    public void remove(SUser entity) {
        entityManager.remove(entity);
    }

    @Override
    public Optional<SUser> findById(int id) {
        return Optional.ofNullable(entityManager.find(SUser.class, id));
    }

    @Override
    public List<SUser> findAll() {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<SUser> query = builder.createQuery(SUser.class);
        query.select(query.from(SUser.class));
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Optional<SUser> findByUserName(String username) {
        List<SUser> result = entityManager.createQuery("select user from SUser user where user.username like ?1").
                setParameter(1, username).getResultList();
        return result.isEmpty() ? Optional.empty() : Optional.ofNullable(result.get(0));
    }
}

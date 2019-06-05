package ro.utcn.sd.boti.stackoverflow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.boti.stackoverflow.entity.SUser;
import ro.utcn.sd.boti.stackoverflow.exception.UserNotFoundException;
import ro.utcn.sd.boti.stackoverflow.repository.RepositoryFactory;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class SUserDetailsService implements UserDetailsService {
    private final RepositoryFactory repositoryFactory;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SUser user = repositoryFactory.getUserRepository().findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("Unknown user!"));
        return new User(user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Transactional
    public SUser loadCurrentUser() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return repositoryFactory.getUserRepository().findByUserName(name).orElseThrow(UserNotFoundException::new);
    }

}
package ro.utcn.sd.boti.stackoverflow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.boti.stackoverflow.dto.SUserDTO;
import ro.utcn.sd.boti.stackoverflow.entity.SUser;
import ro.utcn.sd.boti.stackoverflow.repository.RepositoryFactory;

@Service
@RequiredArgsConstructor
public class SUserService {
    private final RepositoryFactory repositoryFactory;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public SUserDTO addUser(SUserDTO sUserDTO) {
        SUser sUser = new SUser(sUserDTO.getUsername(), passwordEncoder.encode(sUserDTO.getPassword()), 0);
        return SUserDTO.ofEntity(repositoryFactory.getUserRepository().save(sUser));
    }
}

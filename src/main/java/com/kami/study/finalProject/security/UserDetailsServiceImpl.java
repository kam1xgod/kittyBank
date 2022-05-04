package com.kami.study.finalProject.security;

import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsServiceImpl")
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User user = repository.findByMail(mail)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with {%s} email not found", mail)));
        if (user.getActivationCode() != null) {
            throw new LockedException("Email not activated.");
        }
        return UserPrincipal.create(user);
    }
}

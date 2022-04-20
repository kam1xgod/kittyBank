package com.kami.study.finalProject.security;

import com.kami.study.finalProject.model.user.User;
import com.kami.study.finalProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository repository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        User user = repository.findByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException(String.format("User with {%s} phone number not found", phoneNumber)));
        return UserPrincipal.create(user);
    }
}

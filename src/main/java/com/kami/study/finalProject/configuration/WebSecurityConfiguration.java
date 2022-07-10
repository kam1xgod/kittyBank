package com.kami.study.finalProject.configuration;

import com.kami.study.finalProject.security.JwtConfigurer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@Slf4j
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final JwtConfigurer jwtConfigurer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/auth/**",
                        "/api/v1/auth/login",
                        "/api/v1/registration/**",
                        "/api/v1/savings/all",
                        "/websocket", "/websocket/**",
                        "/static/**").permitAll()
                .antMatchers("/auth/**",
                        "/**/*swagger*/**",
                        "/v2/api-docs").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(jwtConfigurer);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

package com.kami.study.finalProject.security.oauth2;

import com.kami.study.finalProject.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//@Component
@Deprecated
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

//    private final JwtProvider jwtProvider;
//
//    @Value("${hostname}")
//    private String hostname;
//
//    @Autowired
//    public OAuth2SuccessHandler(JwtProvider jwtProvider) {
//        this.jwtProvider = jwtProvider;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        OAuth2UserInfo oAuth2UserInfo = (OAuth2UserInfo) authentication.getPrincipal();
//        String mail = (String) oAuth2UserInfo.getAttributes().get("mail");
//        String token = jwtProvider.createToken(mail, "USER");
//        String uri = UriComponentsBuilder.fromUriString("http://" + hostname + "/oauth2/redirect")
//                .queryParam("token", token)
//                .build().toUriString();
//        getRedirectStrategy().sendRedirect(request, response, uri);
//    }
}

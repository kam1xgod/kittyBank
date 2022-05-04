package com.kami.study.finalProject.security.oauth2;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

//@Service
//@RequiredArgsConstructor
@Deprecated
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

//    @Lazy
//    @Autowired
//    private final AuthenticationService authenticationService;
//
//    private final UserService userService;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        String provider = userRequest.getClientRegistration().getRegistrationId();
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//        OAuth2UserInfo oAuth2UserInfo = OAuth2UserFactory.getOAuth2UserInfo(provider, oAuth2User.getAttributes());
//        User user = userService.findUserByEmail(oAuth2UserInfo.getMail());
//
//        if (user == null) {
//            user = authenticationService.registerOauth2User(provider, oAuth2UserInfo);
//        } else {
//            user = authenticationService.updateOauth2User(user, provider, oAuth2UserInfo);
//        }
//         return UserPrincipal.create(user, oAuth2User.getAttributes());
//    }
}

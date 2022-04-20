package com.kami.study.finalProject.service.email;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;
import java.util.Map;

@Service
public class MailSender {

    private final JavaMailSender sender;
    private final SpringTemplateEngine thymeleafTemplateEngine;

    @Autowired
    public MailSender(JavaMailSender sender, SpringTemplateEngine thymeleafTemplateEngine) {
        this.sender = sender;
        this.thymeleafTemplateEngine = thymeleafTemplateEngine;
    }

    @Value("${spring.mail.username}")
    private String username;

    @SneakyThrows
    public void sendMessageHtml(String to, String subject, String template, Map<String, Object> attributes) throws MessagingException {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(attributes);
        String htmlBody = thymeleafTemplateEngine.process(template, thymeleafContext);
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(username);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        sender.send(message);
    }
}

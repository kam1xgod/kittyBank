package com.kami.study.finalProject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class HomeController {

    @GetMapping
    ResponseEntity<String> home() {
    // Guess, I was planning add something here. But I can't remember exactly, so.. Will think of it later.
    // May be some kind of a news? dumb idea, but may be.
        return ResponseEntity.ok("Hello!");
    }
}

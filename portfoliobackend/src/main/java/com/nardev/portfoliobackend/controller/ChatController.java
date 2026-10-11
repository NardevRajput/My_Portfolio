package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.dto.ChatRequest;
import com.nardev.portfoliobackend.dto.ChatResponse;
import com.nardev.portfoliobackend.service.ChatService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    /**
     * Handle chatbot messages.
     */
    @PostMapping
    public ResponseEntity<ChatResponse> chat(
            @RequestBody(required = false) ChatRequest request) {

        // Validate the request.
        if (request == null
                || request.getMessage() == null
                || request.getMessage().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body(new ChatResponse(
                            "Please type a message and I'll be happy to help."));
        }

        String message = request.getMessage().trim();

        // Prevent unnecessarily large requests.
        if (message.length() > 2000) {
            return ResponseEntity.badRequest()
                    .body(new ChatResponse(
                            "Your message is too long. Please keep it under 2000 characters."));
        }

        try {
            // Generate the chatbot response.
            String reply = chatService.chat(message);

            // Handle empty responses.
            if (reply == null || reply.trim().isEmpty()) {
                logger.warn("ChatService returned an empty response.");

                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body(new ChatResponse(
                                "I'm having trouble responding right now. Please try again."));
            }

            return ResponseEntity.ok(new ChatResponse(reply));

        } catch (Exception exception) {

            logger.error("Error while processing chatbot message.", exception);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ChatResponse(
                            "I'm having trouble responding right now. Please try again in a moment."));
        }
    }

    /**
     * Check whether the chatbot API is available.
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Chat API is working."));
    }
}
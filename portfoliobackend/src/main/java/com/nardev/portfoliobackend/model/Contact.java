package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String message;
}
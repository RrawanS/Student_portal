package com.example.demo.entity;


import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 250,nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 250,nullable = false)
    private String lastName;


    @Column(length = 100,nullable = false)
    private String email;

    @Column(name = "birth_date",nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "levelOfStudy",nullable = false)
    private String levelOfStudy;

    @Column(name = "faculty",nullable = false)
    private String faculty;

    @Column(name = "program",nullable = false)
    private String program;

}


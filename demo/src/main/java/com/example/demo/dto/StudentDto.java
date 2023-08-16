package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.Date;

@Getter
@Setter
public class StudentDto {
    private Long id;

    @NotEmpty
    @Pattern(regexp = "^[A-Za-z]+$", message = "Please enter only text characters")
    private String firstName;

    @NotEmpty
    @Pattern(regexp = "^[A-Za-z]+$", message = "Please enter only text characters")
    private String lastName;

    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Past
    private Date birthDate;

    @NotEmpty
    private String levelOfStudy;

    @NotEmpty
    private String faculty;

    @NotEmpty
    private String program;
}

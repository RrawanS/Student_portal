package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserDto {
    private Long id;

    @NotNull
    private StudentDto student;

    @NotEmpty
    @Size(min = 6, max = 50)
    private String passWord;

    @NotEmpty
    private String confirmPassWord;

}

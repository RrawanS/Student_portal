package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.exception.PasswordMismatchException;
import com.example.demo.exception.UsernameAlreadyExistsException;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;

    public void registerUser (UserDto userDto) {
//         Check if username is already taken
        if (userRepository.existsByUserName(userDto.getStudent().getEmail())) {
            throw new UsernameAlreadyExistsException("Username is already taken");
        }

        // Check if passwords match
        if (!userDto.getPassWord().equals(userDto.getConfirmPassWord())) {
            throw new PasswordMismatchException("Passwords do not match");
        }


        // Create and set user properties
        User user = new User();
        user.setUserName(userDto.getStudent().getEmail());
        user.setPassWord(userDto.getPassWord());

        // Create and set student properties
        Student student = new Student();
        student.setFirstName(userDto.getStudent().getFirstName());
        student.setLastName(userDto.getStudent().getLastName());
        student.setEmail(userDto.getStudent().getEmail());
        student.setBirthDate(userDto.getStudent().getBirthDate());
        student.setProgram(userDto.getStudent().getProgram());
        student.setFaculty(userDto.getStudent().getFaculty());
        student.setLevelOfStudy(userDto.getStudent().getLevelOfStudy());
        studentRepository.save(student);

        // Associate student with user
        user.setStudent(student);

        // Save user with associated student
        userRepository.save(user);
    }

    public User getUserByUsername(String userName) {
        return userRepository.findByUserName(userName);
    }
}

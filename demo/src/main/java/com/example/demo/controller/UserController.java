package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.UsersRepo;
import com.example.demo.entity.Users;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    @Autowired
    UsersRepo userrepo;

    @PostMapping("/api/users")
    public ResponseEntity<Users> saveUser(@RequestBody Users users) {
        return new ResponseEntity<>(userrepo.save(users), HttpStatus.CREATED);
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<Users>> getUsers() {
        return new ResponseEntity<>(userrepo.findAll(), HttpStatus.OK);

    }
}

package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/api/users/{accountNumber}")
    public ResponseEntity<Users> getUser(@PathVariable String accountNumber) {
        Optional<Users> user  = userrepo.findByAccountNumber(accountNumber);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/update/users/{accountNumber}")
    public ResponseEntity<Users> updateUser(@PathVariable String accountNumber, @RequestBody Users userAccount) {
        Optional<Users> user  = userrepo.findByAccountNumber(accountNumber);
        if(user.isPresent()){
            user.get().setFirstName(userAccount.getFirstName());
            user.get().setLastName(userAccount.getLastName());
            user.get().setEmailId(userAccount.getEmailId());
            user.get().setPhoneNumber(userAccount.getPhoneNumber());
            return new ResponseEntity<>(userrepo.save(user.get()), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

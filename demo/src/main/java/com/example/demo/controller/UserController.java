package com.example.demo.controller;

import java.time.LocalDateTime;
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

import com.example.demo.Repo.TransactionsRepo;
import com.example.demo.Repo.UsersRepo;
import com.example.demo.entity.Accounts;
import com.example.demo.entity.Transactions;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    @Autowired
    UsersRepo userrepo;

    @Autowired
    TransactionsRepo TransactionsRepo;

    @PostMapping("/api/users")
    public ResponseEntity<Accounts> saveUser(@RequestBody Accounts users) {
        return new ResponseEntity<>(userrepo.save(users), HttpStatus.CREATED);
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<Accounts>> getUsers() {
        return new ResponseEntity<>(userrepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/transactions")
    public ResponseEntity<List<Transactions>> getTransactions(){
        return new ResponseEntity<>(TransactionsRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/users/{accountNumber}")
    public ResponseEntity<Accounts> getUser(@PathVariable String accountNumber) {
        Optional<Accounts> user  = userrepo.findByAccountNumber(accountNumber);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/update/users/{accountNumber}")
    public ResponseEntity<Accounts> updateUser(@PathVariable String accountNumber, @RequestBody Accounts userAccount) {
        Optional<Accounts> user  = userrepo.findByAccountNumber(accountNumber);
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

    @PutMapping("/api/updatebalances-from/{fromaccountNumber}/{toaccountnumber}/{transferAmount}")
    public ResponseEntity<Accounts> updateFromBalances(@PathVariable String fromaccountNumber, @PathVariable String toaccountnumber, @PathVariable String transferAmount, @RequestBody Accounts userAccount) {
        Optional<Accounts> fromUser = userrepo.findByAccountNumber(fromaccountNumber);
        
        if (fromUser.isPresent()) {

            fromUser.get().setBalance(userAccount.getBalance());
            userrepo.save(fromUser.get());  

            Transactions debitTransaction = new Transactions(
                fromaccountNumber,
                toaccountnumber,
                userAccount.getBalance(),  
                transferAmount,
                "DEBIT",
                LocalDateTime.now()
            );
            TransactionsRepo.save(debitTransaction);
        
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/updatebalances-to/{toaccountnumber}/{fromaccountnumber}/{transferAmount}")
    public ResponseEntity<Accounts> updateToBalances(@PathVariable String toaccountnumber, @PathVariable String fromaccountnumber, @PathVariable String transferAmount, @RequestBody Accounts userAccount) {
        Optional<Accounts> toUser = userrepo.findByAccountNumber(toaccountnumber);
        
        if (toUser.isPresent()) {

            toUser.get().setBalance(userAccount.getBalance());
            userrepo.save(toUser.get());  

            Transactions creditTransaction = new Transactions(
                fromaccountnumber,
                toaccountnumber,
                userAccount.getBalance(),
                transferAmount,
                "CREDIT",
                LocalDateTime.now()
            );
            TransactionsRepo.save(creditTransaction);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
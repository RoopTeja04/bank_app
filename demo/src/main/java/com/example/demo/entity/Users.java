package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String FirstName;
    private String LastName;
    private String PhoneNumber;
    private String EmailId;
    private String Balance;
    private String AccountNumber;
    private String AccountType;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getFirstName() {
        return FirstName;
    }
    public void setFirstName(String firstName) {
        FirstName = firstName;
    }
    public String getLastName() {
        return LastName;
    }
    public void setLastName(String lastName) {
        LastName = lastName;
    }
    public String getPhoneNumber() {
        return PhoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }
    public String getEmailId() {
        return EmailId;
    }
    public void setEmailId(String emailId) {
        EmailId = emailId;
    }
    public String getBalance() {
        return Balance;
    }
    public void setBalance(String balance) {
        Balance = balance;
    }
    public String getAccountNumber() {
        return AccountNumber;
    }
    public void setAccountNumber(String accountNumber) {
        AccountNumber = accountNumber;
    }
    public String getAccountType() {
        return AccountType;
    }
    public void setAccountType(String accountType) {
        AccountType = accountType;
    }
    public Users(long id, String firstName, String lastName, String phoneNumber, String emailId, String balance,
            String accountNumber, String accountType) {
            super();
            this.id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.PhoneNumber = phoneNumber;
            this.EmailId = emailId;
            this.Balance = balance;
            this.AccountNumber = accountNumber;
            this.AccountType = accountType;
    }

    public Users(){
        super();
    }
    @Override
    public String toString() {
        return "Users [id=" + id + ", FirstName=" + FirstName + ", LastName=" + LastName + ", PhoneNumber=" + PhoneNumber
                + ", EmailId=" + EmailId + ", Balance=" + Balance + ", AccountNumber=" + AccountNumber
                + ", AccountType=" + AccountType + "]";
    }

}

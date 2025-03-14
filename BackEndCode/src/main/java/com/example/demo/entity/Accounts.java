package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Accounts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String FirstName;
    private String LastName;
    private String PhoneNumber;
    private String EmailId;
    private String Balance;

    @Column(unique = true, nullable = false)
    private String accountNumber;
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
        return accountNumber;
    }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getAccountType() {
        return AccountType;
    }
    public void setAccountType(String accountType) {
        AccountType = accountType;
    }
    
    public Accounts(long id, String firstName, String lastName, String phoneNumber, String emailId, String balance,
            String accountNumber, String accountType) {
            super();
            this.id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.PhoneNumber = phoneNumber;
            this.EmailId = emailId;
            this.Balance = balance;
            this.accountNumber = accountNumber;
            this.AccountType = accountType;
    }

    public Accounts(){
        super();
    }
    
    @Override
    public String toString() {
        return "Users [id=" + id + ", FirstName=" + FirstName + ", LastName=" + LastName + ", PhoneNumber=" + PhoneNumber
                + ", EmailId=" + EmailId + ", Balance=" + Balance + ", AccountNumber=" + accountNumber
                + ", AccountType=" + AccountType + "]";
    }

}

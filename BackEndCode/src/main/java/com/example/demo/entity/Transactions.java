package com.example.demo.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String fromAccountNumber;
    private String toAccountNumber;
    private String amount;  
    private String transferAmount;
    private String transactionsType;
    private LocalDateTime transactionsDate;

    public Transactions(String fromAccountNumber, String toAccountNumber, String amount, String transferAmount, String transactionsType, LocalDateTime transactionsDate) {
        this.fromAccountNumber = fromAccountNumber;
        this.toAccountNumber = toAccountNumber;
        this.amount = amount;
        this.transferAmount = transferAmount;
        this.transactionsType = transactionsType;
        this.transactionsDate = transactionsDate;
    }

    public Transactions() {}

    public long getId() {
        return id;
    }

    public String getFromAccountNumber() {
        return fromAccountNumber;
    }

    public void setFromAccountNumber(String fromAccountNumber) {
        this.fromAccountNumber = fromAccountNumber;
    }

    public String getToAccountNumber() {
        return toAccountNumber;
    }

    public void setToAccountNumber(String toAccountNumber) {
        this.toAccountNumber = toAccountNumber;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getTransferAmount() {
        return transferAmount;
    }

    public void setTransferAmount(String transferAmount) {
        this.transferAmount = transferAmount;
    }

    public String getTransactionsType() {
        return transactionsType;
    }

    public void setTransactionsType(String transactionsType) {
        this.transactionsType = transactionsType;
    }

    public LocalDateTime getTransactionsDate() {
        return transactionsDate;
    }

    public void setTransactionsDate(LocalDateTime transactionsDate) {
        this.transactionsDate = transactionsDate;
    }

    @Override
    public String toString() {
        return "Transactions [id=" + id + ", fromAccountNumber=" + fromAccountNumber + ", toAccountNumber="
                + toAccountNumber + ", amount=" + amount + ", transferAmount=" + transferAmount + ", transactionsType=" + transactionsType
                + ", transactionsDate=" + transactionsDate + "]";
    }
}
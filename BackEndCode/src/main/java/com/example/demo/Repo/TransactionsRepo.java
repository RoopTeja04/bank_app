package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.Transactions;

@Repository
public interface TransactionsRepo extends JpaRepository<Transactions, Long> {
}

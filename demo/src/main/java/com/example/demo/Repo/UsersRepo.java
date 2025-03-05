package com.example.demo.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.Accounts;

@Repository
public interface UsersRepo extends JpaRepository<Accounts, Long> {
    Optional<Accounts> findByAccountNumber(String accountNumber);
}

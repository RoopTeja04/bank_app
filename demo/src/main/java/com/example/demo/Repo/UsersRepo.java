package com.example.demo.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByAccountNumber(String accountNumber);
}

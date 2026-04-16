package com.project.lostfound.repository;

import com.project.lostfound.model.Claim;
import com.project.lostfound.model.enums.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByStatus(ClaimStatus status);

    List<Claim> findByItemId(Long itemId);
}

package com.safepi.safepi.Repositories;

import com.safepi.safepi.Entities.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    Optional<FollowUp> findByWorkEventId(Long workEventId);

    Optional<FollowUp> findByUserId(Long userId);
}

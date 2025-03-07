package com.safepi.safepi.Repositories;

import com.safepi.safepi.Entities.WorkEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkEventRepository  extends JpaRepository<WorkEvent, Long> {
    List<WorkEvent> findByUserId(Long userId);
}

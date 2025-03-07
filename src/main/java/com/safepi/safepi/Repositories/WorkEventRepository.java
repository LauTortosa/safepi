package com.safepi.safepi.Repositories;

import com.safepi.safepi.Entities.WorkEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkEventRepository  extends JpaRepository<WorkEvent, Long> {
}

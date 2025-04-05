package com.safepi.safepi.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCompletionHistory extends JpaRepository<ItemCompletionHistory, Long> {
}

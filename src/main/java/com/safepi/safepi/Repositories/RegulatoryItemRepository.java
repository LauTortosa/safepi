package com.safepi.safepi.Repositories;

import com.safepi.safepi.Entities.RegulatoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegulatoryItemRepository extends JpaRepository<RegulatoryItem, Long> {
}

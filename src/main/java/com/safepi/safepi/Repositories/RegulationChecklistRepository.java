package com.safepi.safepi.Repositories;

import com.safepi.safepi.Entities.RegulatoryChecklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegulationChecklistRepository extends JpaRepository<RegulatoryChecklist, Long> {
}

package com.safepi.safepi.Services;

import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import com.safepi.safepi.Entities.WorkEvent;
import com.safepi.safepi.Repositories.WorkEventRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkEventService {
    private final WorkEventRepository workEventRepository;

    public WorkEventService(WorkEventRepository workEventRepository) {
        this.workEventRepository = workEventRepository;
    }

    public List<WorkEvent> getAllWorkEvents() {
        return workEventRepository.findAll();
    }

    public List<WorkEvent> getWorkEventsByUserId(Long userId) {
        return workEventRepository.findByUserId(userId);
    }

    public WorkEvent getWorkEventById(Long id) {
        return workEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WorkEvent no encontrado"));
    }

    public WorkEvent createWorkEvent(WorkEvent workEvent) {
        return workEventRepository.save(workEvent);
    }

    public WorkEvent updateWorkEvent(Long id, WorkEvent workEvent) {
        WorkEvent existingWorkEvent = workEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WorkEvent no encontrado"));

        existingWorkEvent.setUser(workEvent.getUser());
        existingWorkEvent.setCategory(workEvent.getCategory());
        existingWorkEvent.setDate(workEvent.getDate());
        existingWorkEvent.setDescription(workEvent.getDescription());
        existingWorkEvent.setTypeWorkEvent(workEvent.getTypeWorkEvent());
        existingWorkEvent.setLocation(workEvent.getLocation());
        existingWorkEvent.setAffectedPerson(workEvent.getAffectedPerson());
        existingWorkEvent.setWitnesses(workEvent.getWitnesses());
        existingWorkEvent.setFirstAid(workEvent.getFirstAid());
        existingWorkEvent.setImpact(workEvent.getImpact());

        return workEventRepository.save(existingWorkEvent);
    }

    public void deleteWorkEvent(Long id) {
        if (!workEventRepository.existsById(id)) {
            throw  new RuntimeException("WorkEvent no encontrado");
        }
        workEventRepository.deleteById(id);
    }

    public List<Category> getAllCategories() {
        return Arrays.asList(Category.values());
    }

    public List<TypeWorkEvent> getAllTypeWorkEvents() {
        return Arrays.asList(TypeWorkEvent.values());
    }

    public List<Location> getAllLocations() {
        return Arrays.asList(Location.values());
    }

    public List<Impact> getAllImpacts() {
        return Arrays.asList(Impact.values());
    }
}

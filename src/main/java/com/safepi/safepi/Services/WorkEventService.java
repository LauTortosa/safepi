package com.safepi.safepi.Services;

import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import com.safepi.safepi.Entities.User;
import com.safepi.safepi.Entities.WorkEvent;
import com.safepi.safepi.Repositories.WorkEventRepository;
import com.safepi.safepi.dto.WorkEventDTO;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkEventService {
    private final WorkEventRepository workEventRepository;
    private final UserService userService;

    public WorkEventService(WorkEventRepository workEventRepository, UserService userService) {
        this.workEventRepository = workEventRepository;
        this.userService = userService;
    }

    public List<WorkEvent> getAllWorkEvents() {
        return workEventRepository.findAll();
    }

    public List<WorkEvent> getWorkEventsByUserId(Long userId) {
        return workEventRepository.findByUserId(userId);
    }

    public Optional<WorkEvent> getWorkEventById(Long id) {
        return workEventRepository.findById(id);
    }

    public WorkEvent createWorkEvent(WorkEventDTO workEventDTO) {
        User user = userService.getUserById(workEventDTO.getUserId());

        WorkEvent workEvent = new WorkEvent();
        workEvent.setUser(user);
        workEvent.setCategory(workEventDTO.getCategory());
        workEvent.setDate(workEventDTO.getDate());
        workEvent.setTypeWorkEvent(workEventDTO.getTypeWorkEvent());
        workEvent.setDescription(workEventDTO.getDescription());
        workEvent.setLocation(workEventDTO.getLocation());
        workEvent.setAffectedPerson(workEventDTO.getAffectedPerson());
        workEvent.setWitnesses(workEventDTO.getWitnesses());
        workEvent.setFirstAid(workEventDTO.getFirstAid());
        workEvent.setImpact(workEventDTO.getImpact());

        return workEventRepository.save(workEvent);
    }

    public Optional<WorkEvent> updateWorkEvent(Long id, WorkEventDTO workEventDTO) {
        return workEventRepository.findById(id).map(existingWorkEvent -> {
            User user = userService.getUserById(workEventDTO.getUserId());

            existingWorkEvent.setUser(user);
            existingWorkEvent.setCategory(workEventDTO.getCategory());
            existingWorkEvent.setDate(workEventDTO.getDate());
            existingWorkEvent.setDescription(workEventDTO.getDescription());
            existingWorkEvent.setTypeWorkEvent(workEventDTO.getTypeWorkEvent());
            existingWorkEvent.setLocation(workEventDTO.getLocation());
            existingWorkEvent.setAffectedPerson(workEventDTO.getAffectedPerson());
            existingWorkEvent.setWitnesses(workEventDTO.getWitnesses());
            existingWorkEvent.setFirstAid(workEventDTO.getFirstAid());
            existingWorkEvent.setImpact(workEventDTO.getImpact());

            return workEventRepository.save(existingWorkEvent);
        });
    }

    public void deleteWorkEvent(Long id) {
        if (!workEventRepository.existsById(id)) {
            throw new RuntimeException("WorkEvent no encontrado");
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

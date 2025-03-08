package com.safepi.safepi.Controllers;

import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import com.safepi.safepi.Entities.WorkEvent;
import com.safepi.safepi.Services.WorkEventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workEvents")
public class WorkEventController {
    private WorkEventService workEventService;

    public WorkEventController(WorkEventService workEventService) {
        this.workEventService = workEventService;
    }

    @GetMapping
    public ResponseEntity<List<WorkEvent>> getAllWorkEvents() {
        List<WorkEvent> workEvents = workEventService.getAllWorkEvents();
        if (workEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(workEvents);
    }

    @GetMapping("/users/{userId}/workEvents")
    public ResponseEntity<List<WorkEvent>> getWorkEventsByUserId(@PathVariable Long userId) {
        List<WorkEvent> workEvents = workEventService.getWorkEventsByUserId(userId);

        if (workEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(workEvents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkEvent> getWorkEventById(@PathVariable Long id) {
        return workEventService.getWorkEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkEvent> createWorkEvent(@RequestBody WorkEvent workEvent) {
        if (workEvent == null) {
            return ResponseEntity.badRequest().build();
        }
        WorkEvent createdWorkEvent = workEventService.createWorkEvent(workEvent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkEvent> updateWorkEvent(@PathVariable Long id, @RequestBody WorkEvent workEvent) {
        return workEventService.updateWorkEvent(id, workEvent)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkEvent(@PathVariable Long id) {
        workEventService.deleteWorkEvent(id);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> workEvents = workEventService.getAllCategories();

        if (workEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(workEvents);
    }

    @GetMapping("/typeWorkEvents")
    public ResponseEntity<List<TypeWorkEvent>> getAllTypeWorkEvents() {
        List<TypeWorkEvent> workEvents = workEventService.getAllTypeWorkEvents();

        if (workEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(workEvents);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> workEvents = workEventService.getAllLocations();

        if (workEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(workEvents);
    }

    @GetMapping("/impacts")
    public ResponseEntity<List<Impact>> getAllImpacts() {
        List<Impact> workEvents = workEventService.getAllImpacts();

        if (workEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(workEvents);
    }
}

package com.safepi.safepi.Controllers;

import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import com.safepi.safepi.Entities.User;
import com.safepi.safepi.Entities.WorkEvent;
import com.safepi.safepi.Services.UserService;
import com.safepi.safepi.Services.WorkEventService;
import com.safepi.safepi.dto.WorkEventDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workEvents")
public class WorkEventController {
    private WorkEventService workEventService;
    private UserService userService;

    public WorkEventController(WorkEventService workEventService, UserService userService) {
        this.workEventService = workEventService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<WorkEventDTO>> getAllWorkEvents() {
        List<WorkEvent> workEvents = workEventService.getAllWorkEvents();
        List<WorkEventDTO> workEventDTOS = workEvents.stream()
                .map(WorkEventDTO::new)
                .toList();
        return ResponseEntity.ok(workEventDTOS);
    }

    @GetMapping("/users/{userId}/workEvents")
    public ResponseEntity<List<WorkEventDTO>> getWorkEventsByUserId(@PathVariable Long userId) {
        List<WorkEvent> workEvents = workEventService.getWorkEventsByUserId(userId);
        List<WorkEventDTO> workEventDTOS = workEvents.stream()
                .map(WorkEventDTO::new)
                .toList();
        return ResponseEntity.ok(workEventDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkEventDTO> getWorkEventById(@PathVariable Long id) {
        return workEventService.getWorkEventById(id)
                .map(workEnvet -> {
                    WorkEventDTO workEventDTO = new WorkEventDTO(workEnvet);
                    return ResponseEntity.ok(workEventDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkEventDTO> createWorkEvent(@RequestBody WorkEventDTO workEventDTO) {
        WorkEvent createdWorkEvent = workEventService.createWorkEvent(workEventDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(new WorkEventDTO(createdWorkEvent));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkEventDTO> updateWorkEvent(@PathVariable Long id, @RequestBody WorkEventDTO workEventDTO) {
        return workEventService.updateWorkEvent(id, workEventDTO)
                .map(updatedWorkEvent -> ResponseEntity.ok(new WorkEventDTO(updatedWorkEvent)))
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

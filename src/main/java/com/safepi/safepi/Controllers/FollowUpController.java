package com.safepi.safepi.Controllers;

import com.safepi.safepi.Entities.Enums.WorkStatus;
import com.safepi.safepi.Entities.FollowUp;
import com.safepi.safepi.Services.FollowUpService;
import com.safepi.safepi.dto.FollowUpDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/followUp")
public class FollowUpController {
    private final FollowUpService followUpService;

    public FollowUpController(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    @GetMapping
    public ResponseEntity<List<FollowUpDTO>> getAllFollowsUp() {
        List<FollowUp> followUps = followUpService.getAllFollowUps();
        List<FollowUpDTO> followUpDTOS = followUps.stream()
                .map(FollowUpDTO::new)
                .toList();

        return ResponseEntity.ok(followUpDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FollowUpDTO> getFollowUpsById(@PathVariable Long id) {
        Optional<FollowUp> followUpOptional = followUpService.getFollowUpsById(id);

        return followUpOptional
                .map(followUp -> ResponseEntity.ok(new FollowUpDTO(followUp)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/workEvent/{id}")
    public ResponseEntity<FollowUpDTO> getFollowUpsByWorkEventById(@PathVariable Long id) {
        Optional<FollowUp> followUpOptional = followUpService.getFollowUpsByWorkEventId(id);

        return followUpOptional
                .map(followUp -> ResponseEntity.ok(new FollowUpDTO(followUp)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<FollowUpDTO> getFollowUpsByUserId(@PathVariable Long id) {
        Optional<FollowUp> followUpOptional = followUpService.getFollowUpsByUserId(id);

        return followUpOptional
                .map(followUp -> ResponseEntity.ok(new FollowUpDTO(followUp)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FollowUpDTO> createFollowUp(@RequestBody FollowUpDTO followUpDTO) {
        FollowUp createdFollowUp = followUpService.createFollowUp(followUpDTO);
        FollowUpDTO createdFollowUpDTO = new FollowUpDTO(createdFollowUp);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFollowUpDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FollowUpDTO> updateFollowUp(@PathVariable Long id, @RequestBody FollowUpDTO followUpDTO) {
        FollowUp updatedFollowUp = followUpService.updateFollowUp(id, followUpDTO);

        FollowUpDTO updatedFollowUpDTO = new FollowUpDTO(updatedFollowUp);

        return ResponseEntity.ok(updatedFollowUpDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFollowUp(@PathVariable Long id) {
        followUpService.deleteFollowUp(id);
    }

    @GetMapping("/workStatus")
    public ResponseEntity<List<WorkStatus>> getAllWorkStatus() {
        List<WorkStatus> workStatus = followUpService.getAllWorkStatus();
        if (workStatus.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(workStatus);
    }



}

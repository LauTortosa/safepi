package com.safepi.safepi.Services;

import com.safepi.safepi.Entities.Enums.WorkStatus;
import com.safepi.safepi.Entities.FollowUp;
import com.safepi.safepi.Entities.WorkEvent;
import com.safepi.safepi.Repositories.FollowUpRepository;
import com.safepi.safepi.dto.FollowUpDTO;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class FollowUpService {
    private FollowUpRepository followUpRepository;
    private WorkEventService workEventService;

    public FollowUpService(FollowUpRepository followUpRepository, WorkEventService workEventService) {
        this.followUpRepository = followUpRepository;
        this.workEventService = workEventService;
    }

    public List<FollowUp> getAllFollowUps() {
        return followUpRepository.findAll();
    }

    public Optional<FollowUp> getFollowUpsById(Long id) {
        return followUpRepository.findById(id);
    }

    public Optional<FollowUp> getFollowUpsByWorkEventId(Long id) {
        return followUpRepository.findByWorkEventId(id);
    }

    public Optional<FollowUp> getFollowUpsByUserId(Long id) {
        return followUpRepository.findByUserId(id);
    }

    public FollowUp createFollowUp(FollowUpDTO followUpDTO) {
        WorkEvent workEvent = workEventService.getWorkEventById(followUpDTO.getWorkEventId())
                .orElseThrow(() -> new RuntimeException("WorkEvent not found"));

        FollowUp followUp = new FollowUp();
        followUp.setWorkEvent(workEvent);
        followUp.setDate(followUpDTO.getDate());
        followUp.setWorkStatus(followUpDTO.getWorkStatus());
        followUp.setMedicalEvolution(followUpDTO.getMedicalEvolution());
        followUp.setDoctorNotes(followUpDTO.getDoctorNotes());
        followUp.setNextCheckupDate(followUpDTO.getNextCheckupDate());
        followUp.setPrenventiveMesures(followUpDTO.getPreventiveMesures());
        followUp.setEmployeeFeedback(followUpDTO.getEmployeeFeedback());
        followUp.setComments(followUpDTO.getComments());

        return followUpRepository.save(followUp);
    }

    public FollowUp updateFollowUp(Long id, FollowUpDTO followUpDTO) {
        FollowUp existingFollowUp = followUpRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FollowUp not found"));

        WorkEvent workEvent = workEventService.getWorkEventById(followUpDTO.getWorkEventId())
                    .orElseThrow(() -> new RuntimeException("WorkEvent not found"));

            existingFollowUp.setWorkEvent(workEvent);
            existingFollowUp.setDate(followUpDTO.getDate());
            existingFollowUp.setWorkStatus(followUpDTO.getWorkStatus());
            existingFollowUp.setMedicalEvolution(followUpDTO.getMedicalEvolution());
            existingFollowUp.setDoctorNotes(followUpDTO.getDoctorNotes());
            existingFollowUp.setNextCheckupDate(followUpDTO.getNextCheckupDate());
            existingFollowUp.setPrenventiveMesures(followUpDTO.getPreventiveMesures());
            existingFollowUp.setEmployeeFeedback(followUpDTO.getEmployeeFeedback());
            existingFollowUp.setComments(followUpDTO.getComments());

            return followUpRepository.save(existingFollowUp);
    }

    public void deleteFollowUp(Long id) {
        if (!followUpRepository.existsById(id)) {
            throw new RuntimeException("Follow up no encontrado");
        }

        followUpRepository.deleteById(id);
    }

    public List<WorkStatus> getAllWorkStatus() {
        return Arrays.asList(WorkStatus.values());
    }
}

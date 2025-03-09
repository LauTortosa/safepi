package com.safepi.safepi.dto;

import com.safepi.safepi.Entities.Enums.WorkStatus;
import com.safepi.safepi.Entities.FollowUp;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public class FollowUpDTO {
    private Long id;
    private Long workEventId;
    private LocalDate date;
    private WorkStatus workStatus;
    private String medicalEvolution;
    private String doctorNotes;
    private LocalDate nextCheckupDate;
    private String preventiveMesures;
    private String employeeFeedback;
    private String comments;

    public FollowUpDTO(FollowUp followUp) {
        this.id = followUp.getId();
        this.workEventId = followUp.getId();
        this.date = followUp.getDate();
        this.workStatus = followUp.getWorkStatus();
        this.medicalEvolution = followUp.getMedicalEvolution();
        this.doctorNotes = followUp.getDoctorNotes();
        this.nextCheckupDate = followUp.getNextCheckupDate();
        this.preventiveMesures = followUp.getPrenventiveMesures();
        this.employeeFeedback = followUp.getEmployeeFeedback();
        this.comments = followUp.getComments();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWorkEventId() {
        return workEventId;
    }

    public void setWorkEventId(Long workEventId) {
        this.workEventId = workEventId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public WorkStatus getWorkStatus() {
        return workStatus;
    }

    public void setWorkStatus(WorkStatus workStatus) {
        this.workStatus = workStatus;
    }

    public String getMedicalEvolution() {
        return medicalEvolution;
    }

    public void setMedicalEvolution(String medicalEvolution) {
        this.medicalEvolution = medicalEvolution;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public LocalDate getNextCheckupDate() {
        return nextCheckupDate;
    }

    public void setNextCheckupDate(LocalDate nextCheckupDate) {
        this.nextCheckupDate = nextCheckupDate;
    }

    public String getPreventiveMesures() {
        return preventiveMesures;
    }

    public void setPreventiveMesures(String preventiveMesures) {
        this.preventiveMesures = preventiveMesures;
    }

    public String getEmployeeFeedback() {
        return employeeFeedback;
    }

    public void setEmployeeFeedback(String employeeFeedback) {
        this.employeeFeedback = employeeFeedback;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}

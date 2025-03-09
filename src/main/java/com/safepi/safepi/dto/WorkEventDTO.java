package com.safepi.safepi.dto;

import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import com.safepi.safepi.Entities.WorkEvent;

import java.time.LocalDate;

public class WorkEventDTO {
    private Long id;
    private Long userId;
    private Category category;
    private LocalDate date;
    private String description;
    private TypeWorkEvent typeWorkEvent;
    private Location location;
    private String affectedPerson;
    private String witnesses;
    private String firstAid;
    private Impact impact;

    public WorkEventDTO() {}

    public WorkEventDTO(WorkEvent workEvent) {
        this.id = workEvent.getId();
        this.userId = workEvent.getUser().getId();
        this.category = workEvent.getCategory();
        this.date = workEvent.getDate();
        this.description = workEvent.getDescription();
        this.typeWorkEvent = workEvent.getTypeWorkEvent();
        this.location = workEvent.getLocation();
        this.affectedPerson = workEvent.getAffectedPerson();
        this.witnesses = workEvent.getWitnesses();
        this.firstAid = workEvent.getFirstAid();
        this.impact = workEvent.getImpact();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TypeWorkEvent getTypeWorkEvent() {
        return typeWorkEvent;
    }

    public void setTypeWorkEvent(TypeWorkEvent typeWorkEvent) {
        this.typeWorkEvent = typeWorkEvent;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getAffectedPerson() {
        return affectedPerson;
    }

    public void setAffectedPerson(String affectedPerson) {
        this.affectedPerson = affectedPerson;
    }

    public String getWitnesses() {
        return witnesses;
    }

    public void setWitnesses(String witnesses) {
        this.witnesses = witnesses;
    }

    public String getFirstAid() {
        return firstAid;
    }

    public void setFirstAid(String firstAid) {
        this.firstAid = firstAid;
    }

    public Impact getImpact() {
        return impact;
    }

    public void setImpact(Impact impact) {
        this.impact = impact;
    }
}

package com.safepi.safepi.dto;

import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.Probability;
import com.safepi.safepi.Entities.Enums.State;
import com.safepi.safepi.Entities.Risk;

import java.util.Date;

public class RiskDTO {
    private Long id;

    private Date date;
    private Location location;
    private String description;
    private Impact impact;
    private Probability probability;

    private Integer gravity;
    private State state;
    private Long userId;

    private String name;

    private String last_name;

    private String risk;

    public RiskDTO(Risk risk) {
        this.id = risk.getId();
        this.date = risk.getDate();
        this.location = risk.getLocation();
        this.description = risk.getDescription();
        this.impact = risk.getImpact();
        this.probability = risk.getProbability();
        this.gravity = risk.getGravity();
        this.state = risk.getState();
        this.userId = risk.getUser().getId();
        this.risk = risk.getRisk();
        this.name = risk.getUser().getName();
        this.last_name = risk.getUser().getLast_name();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public Long getId() { return id; }

    public Date getDate() { return date; }

    public void setDate(Date date) { this.date = date; }

    public Location getLocation() { return location; }

    public void setLocation(Location location) { this.location = location; }

    public Integer getGravity() { return gravity; }

    public void setGravity(Integer gravity) { this.gravity = gravity; }

    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }

    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Impact getImpact() { return impact; }
    public void setImpact(Impact impact) { this.impact = impact; }

    public Probability getProbability() { return probability; }
    public void setProbability(Probability probability) { this.probability = probability; }

    public State getState() { return state; }
    public void setState(State state) { this.state = state; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}

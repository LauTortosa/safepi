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

    public RiskDTO() {}
    public RiskDTO(Risk riskEntity) {
        this.id = riskEntity.getId();
        this.date = riskEntity.getDate();
        this.location = riskEntity.getLocation();
        this.description = riskEntity.getDescription();
        this.impact = riskEntity.getImpact();
        this.probability = riskEntity.getProbability();
        this.gravity = riskEntity.getGravity();
        this.state = riskEntity.getState();
        this.risk = riskEntity.getRisk();
        this.userId = riskEntity.getUser().getId();
        this.name = riskEntity.getUser().getName();
        this.last_name = riskEntity.getUser().getLast_name();
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

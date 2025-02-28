package com.safepi.safepi.Controllers;

import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.Probability;
import com.safepi.safepi.Entities.Enums.State;
import com.safepi.safepi.Entities.Risk;
import com.safepi.safepi.Entities.User;
import com.safepi.safepi.Services.RiskService;
import com.safepi.safepi.Services.UserService;
import com.safepi.safepi.dto.RiskDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/risks")
public class RiskController {
    private final RiskService riskService;
    private final UserService userService;

    public RiskController(RiskService riskService, UserService userService) {

        this.riskService = riskService;
        this.userService = userService;
    }

    @GetMapping
    public List<RiskDTO> getAllRisks() {
        List<Risk> risks = riskService.getAllRisk();
        return risks.stream().map(RiskDTO::new).toList();
    }

    @GetMapping("/users/{userId}/risks")
    public ResponseEntity<List<Risk>> getRisksByUser(@PathVariable Long userId) {
        List<Risk> risks = riskService.findRisksByUserId(userId);
        return ResponseEntity.ok(risks);
    }

    @GetMapping("/probability")
    public List<Probability> getProbability() {
        return riskService.getAllProbability();
    }

    @GetMapping("/impacts")
    public List<Impact> getImpacts() {
        return riskService.getAllImpacts();
    }

    @GetMapping("/states")
    public List<State> getStates() {
        return riskService.getAllStates();
    }

    @GetMapping("/locations")
    public List<Location> getLocations() { return  riskService.getAllLocations(); }

    @GetMapping("/{id}")
    public Risk getRiskById(@PathVariable Long id) {
        return riskService.getRiskById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Risk createRisk(@RequestBody RiskDTO riskDTO) {
        User user = userService.getUserById(riskDTO.getUserId());

        Risk risk = new Risk();
        risk.setDate(riskDTO.getDate());
        risk.setLocation(riskDTO.getLocation());
        risk.setDescription(riskDTO.getDescription());
        risk.setImpact(riskDTO.getImpact());
        risk.setProbability(riskDTO.getProbability());
        risk.setGravity(riskDTO.getGravity());
        risk.setState(Optional.ofNullable(riskDTO.getState()).orElse(State.PENDIENTE));
        risk.setRisk(riskDTO.getRisk());

        risk.setUser(user);

        return riskService.createRisk(risk);
    }

    @PutMapping("/{id}")
    public Risk updateRisk(@PathVariable Long id, @RequestBody Risk risk) {
        return riskService.updateRisk(id,risk);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRisk(@PathVariable Long id) {
        riskService.deleteRisk(id);
    }


}

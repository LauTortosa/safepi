package com.safepi.safepi.Controllers;

import com.safepi.safepi.Entities.Risk;
import com.safepi.safepi.Services.RiskService;
import com.safepi.safepi.dto.RiskDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risks")
public class RiskController {
    private final RiskService riskService;

    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @GetMapping
    public List<RiskDTO> getAllRisks() {
        List<Risk> risks = riskService.getAllRisk();
        return risks.stream().map(RiskDTO::new).toList();
    }



    @GetMapping("/{id}")
    public Risk getRiskById(@PathVariable Long id) {
        return riskService.getRiskById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Risk createRisk(@RequestBody Risk risk) {
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

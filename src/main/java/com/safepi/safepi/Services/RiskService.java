package com.safepi.safepi.Services;

import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Probability;
import com.safepi.safepi.Entities.Enums.State;
import com.safepi.safepi.Entities.Risk;
import com.safepi.safepi.Repositories.RiskRepository;
import org.aspectj.bridge.IMessage;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class RiskService {

    private final RiskRepository riskRepository;

    public RiskService(RiskRepository riskRepository) {
        this.riskRepository = riskRepository;
    }

    public List<Risk> getAllRisk() {
        return riskRepository.findAll();
    }

    public Risk getRiskById(Long id) {
        return riskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Información del riesgo no encontrado"));

    }
    public Risk createRisk(Risk risk) {
        return riskRepository.save(risk);
    }

    public Risk updateRisk(Long id, Risk risk) {
        Risk existingRisk = riskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id del riesgo no encontrado"));

        existingRisk.setDate(risk.getDate());
        existingRisk.setDescription(risk.getDescription());
        existingRisk.setLocation(risk.getLocation());
        existingRisk.setProbability(risk.getProbability());
        existingRisk.setImpact(risk.getImpact());
        existingRisk.setState(risk.getState());

        return riskRepository.save(existingRisk);
    }

    public void deleteRisk(Long id) {
        if (!riskRepository.existsById(id)) {
            throw new RuntimeException("Id del riesgo no encontrado");
        }
        riskRepository.deleteById(id);
    }
    public List<Probability> getAllProbability() { return Arrays.asList(Probability.values());
    }
    public List<Impact> getAllImpacts() { return Arrays.asList(Impact.values());
    }

    public List<State> getAllStates() { return Arrays.asList(State.values());
    }
}

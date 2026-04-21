package com.project.lostfound.controller;

import com.project.lostfound.adapter.ImageAdapter;
import com.project.lostfound.model.Claim;
import com.project.lostfound.model.Claimant;
import com.project.lostfound.model.Moderator;
import com.project.lostfound.model.User;
import com.project.lostfound.model.enums.ClaimStatus;
import com.project.lostfound.repository.UserRepository;
import com.project.lostfound.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/submit")
    public ResponseEntity<Claim> submitClaim(@RequestBody Claim request) {

        if (request.getItem() == null || request.getItem().getId() == null) {
            throw new RuntimeException("Item ID missing");
        }

        if (request.getClaimant() == null || request.getClaimant().getId() == null) {
            throw new RuntimeException("Claimant ID missing");
        }

        User user = userRepository.findById(request.getClaimant().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Claimant)) {
            throw new RuntimeException("User is not claimant");
        }

        Claimant claimant = (Claimant) user;

        Claim claim = claimService.submitClaim(
                request.getItem().getId(),
                claimant,
                request.getProofDescription(),
                null,
                null,
                new ImageAdapter()
        );

        claim.setProofImage(request.getProofImage());

        return ResponseEntity.ok(claimService.saveClaim(claim));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Claim>> getPendingClaims() {
        List<Claim> claims = claimService.getPendingClaims();
        return ResponseEntity.ok(claims);
    }

    @PostMapping("/{claimId}/review")
    public ResponseEntity<Claim> reviewClaim(
            @PathVariable Long claimId,
            @RequestParam Long moderatorId,
            @RequestParam ClaimStatus status,
            @RequestParam String reviewNotes
    ) {
        User user = userRepository.findById(moderatorId).orElse(null);

        if (!(user instanceof Moderator)) {
            return ResponseEntity.badRequest().build();
        }

        Moderator moderator = (Moderator) user;

        Claim claim = claimService.reviewClaim(claimId, moderator, status, reviewNotes);
        return ResponseEntity.ok(claim);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<Claim>> getClaimsByItem(@PathVariable Long itemId) {
        List<Claim> claims = claimService.getClaimsByItem(itemId);
        return ResponseEntity.ok(claims);
    }

    @PutMapping("/{claimId}")
    public ResponseEntity<Claim> updateClaim(
            @PathVariable Long claimId,
            @RequestParam String proofDescription
    ) {
        return claimService.getClaimById(claimId)
                .map(claim -> {
                    claim.setProofDescription(proofDescription);
                    Claim savedClaim = claimService.saveClaim(claim);
                    return ResponseEntity.ok(savedClaim);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{claimId}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Long claimId) {
        if (claimService.getClaimById(claimId).isPresent()) {
            claimService.deleteClaim(claimId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<Claim>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }
}

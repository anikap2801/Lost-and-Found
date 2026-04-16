package com.project.lostfound.controller;

import com.project.lostfound.adapter.DocumentAdapter;
import com.project.lostfound.adapter.ImageAdapter;
import com.project.lostfound.adapter.ProofUploader;
import com.project.lostfound.model.Claim;
import com.project.lostfound.model.Claimant;
import com.project.lostfound.model.Moderator;
import com.project.lostfound.model.enums.ClaimStatus;
import com.project.lostfound.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @PostMapping("/submit")
    public ResponseEntity<Claim> submitClaim(@RequestParam Long itemId,
            @RequestParam Long claimantId,
            @RequestParam String proofDescription,
            @RequestParam(required = false) MultipartFile proofFile,
            @RequestParam(defaultValue = "image") String uploadType) {
        // In a real app, you'd fetch the claimant from the repository
        Claimant claimant = new Claimant("Claimant Name", "claimant@example.com");
        claimant.setId(claimantId);

        ProofUploader uploader;
        if ("document".equals(uploadType)) {
            uploader = new DocumentAdapter();
        } else {
            uploader = new ImageAdapter();
        }

        try {
            byte[] fileData = proofFile != null ? proofFile.getBytes() : null;
            String fileName = proofFile != null ? proofFile.getOriginalFilename() : null;

            Claim claim = claimService.submitClaim(itemId, claimant, proofDescription, fileData, fileName, uploader);
            return ResponseEntity.ok(claim);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Claim>> getPendingClaims() {
        List<Claim> claims = claimService.getPendingClaims();
        return ResponseEntity.ok(claims);
    }

    @PostMapping("/{claimId}/review")
    public ResponseEntity<Claim> reviewClaim(@PathVariable Long claimId,
            @RequestParam Long moderatorId,
            @RequestParam ClaimStatus status,
            @RequestParam String reviewNotes) {
        // In a real app, you'd fetch the moderator from the repository
        Moderator moderator = new Moderator("Moderator Name", "moderator@example.com");
        moderator.setId(moderatorId);

        Claim claim = claimService.reviewClaim(claimId, moderator, status, reviewNotes);
        return ResponseEntity.ok(claim);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<Claim>> getClaimsByItem(@PathVariable Long itemId) {
        List<Claim> claims = claimService.getClaimsByItem(itemId);
        return ResponseEntity.ok(claims);
    }
}

package com.project.lostfound.service;

import com.project.lostfound.adapter.ProofUploader;
import com.project.lostfound.model.*;
import com.project.lostfound.model.enums.ClaimStatus;
import com.project.lostfound.model.enums.ItemStatus;
import com.project.lostfound.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private ItemService itemService;

    @Autowired
    private NotificationManager notificationManager;

    public Claim submitClaim(Long itemId, Claimant claimant, String proofDescription, byte[] proofFile, String fileName,
            ProofUploader uploader) {
        Optional<Item> itemOpt = itemService.getItemById(itemId);
        if (!itemOpt.isPresent()) {
            throw new RuntimeException("Item not found");
        }

        Item item = itemOpt.get();
        if (item.getStatus() != ItemStatus.AVAILABLE) {
            throw new RuntimeException("Item is not available for claiming");
        }

        String proofFilePath = null;
        if (proofFile != null && fileName != null) {
            proofFilePath = uploader.upload(proofFile, fileName);
        }

        Claim claim = new Claim(item, claimant, proofDescription, proofFilePath);
        Claim savedClaim = claimRepository.save(claim);

        // Notify observers about new claim
        notificationManager.notifyObservers("New claim submitted for item: " + item.getName());

        return savedClaim;
    }

    public List<Claim> getPendingClaims() {
        return claimRepository.findByStatus(ClaimStatus.SUBMITTED);
    }

    public Claim reviewClaim(Long claimId, Moderator moderator, ClaimStatus status, String reviewNotes) {
        Optional<Claim> claimOpt = claimRepository.findById(claimId);
        if (!claimOpt.isPresent()) {
            throw new RuntimeException("Claim not found");
        }

        Claim claim = claimOpt.get();
        claim.setStatus(status);
        claim.setModerator(moderator);
        claim.setReviewNotes(reviewNotes);
        claim.setReviewedAt(LocalDateTime.now());

        Claim savedClaim = claimRepository.save(claim);

        if (status == ClaimStatus.APPROVED) {
            // Update item status to claimed
            itemService.updateItemStatus(claim.getItem().getId(), ItemStatus.CLAIMED);
            notificationManager.notifyObservers("Claim approved for item: " + claim.getItem().getName());
        } else if (status == ClaimStatus.REJECTED) {
            notificationManager.notifyObservers("Claim rejected for item: " + claim.getItem().getName());
        }

        return savedClaim;
    }

    public List<Claim> getClaimsByItem(Long itemId) {
        return claimRepository.findByItemId(itemId);
    }

    public Optional<Claim> getClaimById(Long id) {
        return claimRepository.findById(id);
    }

    public Claim saveClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    public void deleteClaim(Long id) {
        claimRepository.deleteById(id);
    }

    public List<Claim> getAllClaims() {
    return claimRepository.findAll();
}
}

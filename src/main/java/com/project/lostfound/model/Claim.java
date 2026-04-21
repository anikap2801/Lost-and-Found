package com.project.lostfound.model;

import com.project.lostfound.model.enums.ClaimStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "claimant_id", nullable = false)
    private Claimant claimant;

    @Column(length = 1000)
    private String proofDescription;

    @Column
    private String proofFilePath;

    @Column(columnDefinition = "TEXT")
    private String proofImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimStatus status;

    @Column
    private LocalDateTime submittedAt;

    @Column
    private LocalDateTime reviewedAt;

    @ManyToOne
    @JoinColumn(name = "moderator_id")
    private Moderator moderator;

    @Column(length = 1000)
    private String reviewNotes;

    // Constructors
    public Claim() {
    }

    public Claim(Item item, Claimant claimant, String proofDescription, String proofFilePath) {
        this.item = item;
        this.claimant = claimant;
        this.proofDescription = proofDescription;
        this.proofFilePath = proofFilePath;
        this.status = ClaimStatus.SUBMITTED;
        this.submittedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Claimant getClaimant() {
        return claimant;
    }

    public void setClaimant(Claimant claimant) {
        this.claimant = claimant;
    }

    public String getProofDescription() {
        return proofDescription;
    }

    public void setProofDescription(String proofDescription) {
        this.proofDescription = proofDescription;
    }

    public String getProofFilePath() {
        return proofFilePath;
    }

    public void setProofFilePath(String proofFilePath) {
        this.proofFilePath = proofFilePath;
    }

    public ClaimStatus getStatus() {
        return status;
    }

    public void setStatus(ClaimStatus status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public Moderator getModerator() {
        return moderator;
    }

    public void setModerator(Moderator moderator) {
        this.moderator = moderator;
    }

    public String getReviewNotes() {
        return reviewNotes;
    }

    public void setReviewNotes(String reviewNotes) {
        this.reviewNotes = reviewNotes;
    }

    public String getProofImage() {
        return proofImage;
    }

    public void setProofImage(String proofImage) {
        this.proofImage = proofImage;
    }
}

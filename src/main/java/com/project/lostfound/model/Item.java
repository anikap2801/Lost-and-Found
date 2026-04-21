package com.project.lostfound.model;

import com.project.lostfound.model.enums.ItemStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus status;

    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    private Reporter reporter;

    @Column(nullable = false)
    private LocalDateTime reportedAt;

    @Column(columnDefinition = "TEXT")
    private String image;

    // Constructors
    public Item() {
    }

    public Item(String name, String description, String location, Reporter reporter) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.reporter = reporter;
        this.status = ItemStatus.AVAILABLE;
        this.reportedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public Reporter getReporter() {
        return reporter;
    }

    public void setReporter(Reporter reporter) {
        this.reporter = reporter;
    }

    public LocalDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(LocalDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}

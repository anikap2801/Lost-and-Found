package com.project.lostfound.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("REPORTER")
public class Reporter extends User {

    // Constructors
    public Reporter() {
    }

    public Reporter(String name, String email) {
        super(name, email);
    }

    @Override
    public String getRole() {
        return "Reporter";
    }
}

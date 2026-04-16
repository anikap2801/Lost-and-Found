package com.project.lostfound.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CLAIMANT")
public class Claimant extends User {

    // Constructors
    public Claimant() {
    }

    public Claimant(String name, String email) {
        super(name, email);
    }

    @Override
    public String getRole() {
        return "Claimant";
    }
}

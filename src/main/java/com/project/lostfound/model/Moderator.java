package com.project.lostfound.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("MODERATOR")
public class Moderator extends User {

    // Constructors
    public Moderator() {
    }

    public Moderator(String name, String email) {
        super(name, email);
    }

    @Override
    public String getRole() {
        return "Moderator";
    }
}

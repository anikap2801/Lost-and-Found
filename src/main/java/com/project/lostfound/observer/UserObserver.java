package com.project.lostfound.observer;

import com.project.lostfound.model.User;

public class UserObserver implements Observer {
    private User user;

    public UserObserver(User user) {
        this.user = user;
    }

    @Override
    public void update(String message) {
        // In a real application, this would send an email or notification
        System.out.println("Notification to " + user.getEmail() + ": " + message);
    }

    public User getUser() {
        return user;
    }
}

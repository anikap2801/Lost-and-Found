//Design patttern used
package com.project.lostfound.factory;

import com.project.lostfound.model.*;
import com.project.lostfound.model.enums.UserType;

public class UserFactory {

    public static User createUser(UserType userType, String name, String email) {
        switch (userType) {
            case REPORTER:
                return new Reporter(name, email);
            case CLAIMANT:
                return new Claimant(name, email);
            case MODERATOR:
                return new Moderator(name, email);
            default:
                throw new IllegalArgumentException("Unknown user type: " + userType);
        }
    }
}

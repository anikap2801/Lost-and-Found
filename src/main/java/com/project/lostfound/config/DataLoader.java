package com.project.lostfound.config;

import com.project.lostfound.model.*;
import com.project.lostfound.model.enums.ClaimStatus;
import com.project.lostfound.model.enums.ItemStatus;
import com.project.lostfound.repository.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(UserRepository userRepository,
                              ItemRepository itemRepository,
                              ClaimRepository claimRepository,
                              PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.count() > 0) {
                System.out.println("⚠️ Data already exists, skipping...");
                return;
            }

            // =========================
            // 👤 USERS
            // =========================

            Reporter r1 = new Reporter("Reporter One", "report1@report.com");
            r1.setPassword(passwordEncoder.encode("report"));

            Reporter r2 = new Reporter("Reporter Two", "report2@report.com");
            r2.setPassword(passwordEncoder.encode("report"));

            Claimant c1 = new Claimant("Claimant One", "claim1@claim.com");
            c1.setPassword(passwordEncoder.encode("claim"));

            Claimant c2 = new Claimant("Claimant Two", "claim2@claim.com");
            c2.setPassword(passwordEncoder.encode("claim"));

            Moderator mod = new Moderator("Moderator", "mod@mod.com");
            mod.setPassword(passwordEncoder.encode("mod"));

            userRepository.save(r1);
            userRepository.save(r2);
            userRepository.save(c1);
            userRepository.save(c2);
            userRepository.save(mod);

            // =========================
            // 🖼️ SIMPLE BASE64 IMAGE
            // =========================

            String sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"
                    + "AAAFCAYAAACNbyblAAAAHElEQVQI12P4"
                    + "//8/w38GIAXDIBKE0DHxgljNBAAO"
                    + "9TXL0Y4OHwAAAABJRU5ErkJggg==";

            // =========================
            // 📦 ITEMS
            // =========================

            Item i1 = new Item("Wallet", "Black leather wallet", "Library", r1);
            i1.setImage(sampleImage);

            Item i2 = new Item("Phone", "iPhone cracked", "Cafeteria", r1);
            i2.setImage(sampleImage);

            Item i3 = new Item("Bag", "Blue backpack", "Auditorium", r2);
            i3.setImage(sampleImage);

            Item i4 = new Item("Keys", "Red keychain keys", "Parking Lot", r2);
            i4.setImage(sampleImage);

            itemRepository.save(i1);
            itemRepository.save(i2);
            itemRepository.save(i3);
            itemRepository.save(i4);

            // =========================
            // 📄 CLAIMS
            // =========================

            // Claim 1 → APPROVED → item becomes CLAIMED
            Claim claim1 = new Claim();
            claim1.setItem(i1);
            claim1.setClaimant(c1);
            claim1.setProofDescription("This is my wallet");
            claim1.setProofImage(sampleImage);
            claim1.setStatus(ClaimStatus.APPROVED);
            claim1.setModerator(mod);
            claim1.setSubmittedAt(LocalDateTime.now());
            claim1.setReviewedAt(LocalDateTime.now());

            i1.setStatus(ItemStatus.CLAIMED);

            // Claim 2 → SUBMITTED
            Claim claim2 = new Claim();
            claim2.setItem(i2);
            claim2.setClaimant(c2);
            claim2.setProofDescription("Looks like mine");
            claim2.setProofImage(sampleImage);
            claim2.setStatus(ClaimStatus.SUBMITTED);
            claim2.setSubmittedAt(LocalDateTime.now());

            // Claim 3 → REJECTED
            Claim claim3 = new Claim();
            claim3.setItem(i3);
            claim3.setClaimant(c1);
            claim3.setProofDescription("Maybe mine?");
            claim3.setProofImage(sampleImage);
            claim3.setStatus(ClaimStatus.REJECTED);
            claim3.setModerator(mod);
            claim3.setSubmittedAt(LocalDateTime.now());
            claim3.setReviewedAt(LocalDateTime.now());

            claimRepository.save(claim1);
            claimRepository.save(claim2);
            claimRepository.save(claim3);

            itemRepository.save(i1); // update CLAIMED status

            System.out.println("✅ FULL DEMO DATA LOADED");
        };
    }
}

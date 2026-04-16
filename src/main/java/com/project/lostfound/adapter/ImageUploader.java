package com.project.lostfound.adapter;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class ImageUploader implements ProofUploader {

    private static final String UPLOAD_DIR = "uploads/images/";

    @Override
    public String upload(byte[] fileData, String fileName) {
        try {
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String extension = getFileExtension(fileName);
            String uniqueFileName = UUID.randomUUID().toString() + "." + extension;
            Path filePath = uploadPath.resolve(uniqueFileName);

            // Write file
            Files.write(filePath, fileData);

            return filePath.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    private String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        return lastDotIndex > 0 ? fileName.substring(lastDotIndex + 1) : "";
    }
}

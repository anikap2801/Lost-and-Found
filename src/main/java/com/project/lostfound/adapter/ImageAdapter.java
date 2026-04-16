package com.project.lostfound.adapter;

public class ImageAdapter implements ProofUploader {
    private ImageUploader imageUploader;

    public ImageAdapter() {
        this.imageUploader = new ImageUploader();
    }

    @Override
    public String upload(byte[] fileData, String fileName) {
        // Adapt the image upload to the common interface
        return imageUploader.upload(fileData, fileName);
    }
}

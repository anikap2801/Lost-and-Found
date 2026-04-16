package com.project.lostfound.adapter;

public class DocumentAdapter implements ProofUploader {
    private DocumentUploader documentUploader;

    public DocumentAdapter() {
        this.documentUploader = new DocumentUploader();
    }

    @Override
    public String upload(byte[] fileData, String fileName) {
        // Adapt the document upload to the common interface
        return documentUploader.upload(fileData, fileName);
    }
}

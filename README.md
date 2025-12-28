# SecureVerify Lite – Document Verification Pipeline
---
A secure backend system for document verification with tamper detection, role-based access control, and full audit logging.
Designed to simulate real-world enterprise verification workflows used in banking, hiring, and government systems.

## Overview

SecureVerify Lite enables users to upload documents for verification while ensuring file integrity and accountability.
Verifiers can review documents, detect tampering using cryptographic hashing, and approve or reject submissions.
All security-critical actions are recorded in an immutable audit log for traceability and compliance.

This project focuses on backend correctness, security, and workflow integrity, not UI complexity.

## Key Features

- Secure document upload and storage
- SHA-256 based tamper detection
- Immutable verification workflows
- Role-based access control (RBAC)
- JWT-based authentication
- Comprehensive audit logging
- PostgreSQL-backed relational data model

## Tech Stack

|   Layer	          |     Technology                                          |
| ------------------- | ------------------------------------------------------- |
|   **Backend**	          |     Node.js, Express.js                                 |
|   **Database**    	  |     PostgreSQL                                          |
|   **Authentication**    |     JWT, bcrypt                                         |
|   **Authorization**     |     Role-Based Access Control (USER, VERIFIER, ADMIN)   |
|   **Security**    	  |     SHA-256 hashing                                     |
|   **File Uploads**      |     Multer                                              |
|   **Testing** 	      |     Postman                                             |
|   **Version Control**   |     Git, GitHub                                         |
# SecureVerify Lite – Document Verification Pipeline

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

## User Roles & Responsibilities

### USER
- Register and log in
- Upload documents for verification
- View own document status

### VERIFIER
- Review submitted documents
- Verify or reject documents
- Tamper detection enforced automatically

### ADMIN
- View complete audit logs
- Monitor all system activity

## Verification Workflow
![Verification Workflow](/Images/Verification-Workflow.png)
Once a document is verified or rejected, its status cannot be changed, ensuring workflow immutability.

## Security Design
**Tamper Detection**
- SHA-256 hash generated at upload time
- Hash recomputed at verification time
- Any file modification results in hash mismatch
- Tampered documents are automatically rejected

**Authentication & Authorization**
- JWT used for session management
- Middleware enforces protected routes
- Role checks prevent unauthorized actions

## Audit Logging

Every security-critical action is recorded in the audit_logs table, including:

- User registration
- User login
- Document upload
- Document verification
- Document rejection
- Document tampering detection

Audit logs enable **full traceability** of system activity.

![Audit Logging](/Images/Audit-Logging.png)
![Audit Logs Actions](/Images/Audit-Logs-Actions.png)
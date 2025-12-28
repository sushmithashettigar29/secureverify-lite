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

**USER**
- Register and log in
- Upload documents for verification
- View own document status

**VERIFIER**
- Review submitted documents
- Verify or reject documents
- Tamper detection enforced automatically

**ADMIN**
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

## Testing & Validation
**End-to-End Testing**
- All APIs tested using Postman
- Authentication, upload, verification, and admin routes validated
- Manual testing used to simulate real verification workflows

**System Action Volume**
- Executed 100+ system actions, including uploads, verifications, rejections, logins, and tamper attempts
- Verified via PostgreSQL audit log queries
```
    # Total audit activity
    SELECT COUNT(*) AS total_system_actions
    FROM audit_logs;

    # All Details
    SELECT action, COUNT(*)
    FROM audit_logs
    GROUP BY action
    ORDER BY COUNT(*) DESC;

    # This query shows all tampered documents were rejected.
    SELECT 
    COUNT(*) AS total_tampered,
    SUM(CASE WHEN action = 'DOCUMENT_TAMPERED' THEN 1 ELSE 0 END) AS detected_tampered
    FROM audit_logs
    WHERE action = 'DOCUMENT_TAMPERED';
```
![Testing and Validation](/Images/Testing-Validation.png)

## Tamper Detection Accuracy
**Testing Method**
- Uploaded documents via API
- Manually modified stored files before verification
- Attempted verification on tampered files

**Results**
- Tamper attempts performed: 8
- Tamper attempts detected: 8

**Accuracy Calculation**
    Accuracy = (Detected / Attempted) × 100
    Accuracy = (8 / 8) × 100 = 100%

All tampering attempts during testing were successfully detected and rejected, confirmed via audit logs.


## Project Structure
secureverify-lite/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── utils/
    │   └── app.js
    │   └── server.js
    ├── uploads/           
    ├── Images/       
    ├── package.json
    ├── .env
    ├── README.md
    └── .gitignore

## What This Project Demonstrates
- Backend system design
- Secure file handling
- Authentication & authorization patterns
- Workflow enforcement
- Audit-friendly architecture
- Practical security thinking

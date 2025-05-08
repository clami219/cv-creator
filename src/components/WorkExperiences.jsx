import React, { useState } from 'react'
import Container from './Container';
import WorkExperience from './WorkExperience';

export default function WorkExperiences() {
    const exps = [
        createWkExp('IBM', 'Full stack developer', '<p><strong style="color: rgb(0, 0, 0);">Design and Implement Web Applications</strong><span style="color: rgb(0, 0, 0);"> – Collaborated with cross-functional teams to design and implement scalable web applications using React for the frontend and Node.js for the backend, ensuring high performance and responsiveness.</span></p><p><strong style="color: rgb(0, 0, 0);">API Development and Integration</strong><span style="color: rgb(0, 0, 0);"> – Developed and maintained RESTful APIs to enable seamless communication between frontend interfaces and backend services, optimizing data flow and security.</span></p><p><strong style="color: rgb(0, 0, 0);">Cloud Deployment and Management</strong><span style="color: rgb(0, 0, 0);"> – Deployed microservices-based applications on IBM Cloud, leveraging Kubernetes and Docker for containerization and orchestration, ensuring high availability and fault tolerance.</span></p><p><strong style="color: rgb(0, 0, 0);">Database Optimization and Maintenance</strong><span style="color: rgb(0, 0, 0);"> – Managed and optimized SQL and NoSQL databases, implementing indexing and caching strategies to enhance query performance and data integrity.</span></p><p><strong style="color: rgb(0, 0, 0);">Agile Collaboration and Code Review</strong><span style="color: rgb(0, 0, 0);"> – Participated in Agile ceremonies, including daily stand-ups and sprint planning, and conducted code reviews to ensure adherence to IBM\'s coding standards and best practices.</span></p>', '20012-01-01', '2013-03-30')
    ];
    const hr = <hr className="border-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    return (
        <Container title="Work experience">
            <WorkExperience exp={{}} editing={true} />
            {hr}
            {exps.map((exp, index) => (
                <React.Fragment key={exp.id}>
                    {(index > 0) && hr}
                    <WorkExperience exp={exp} />
                </React.Fragment>
            ))}
        </Container>
    );
}

function createWkExp(companyName, positionTitle, mainResp, dateFrom, dateUntil) {
    return {
        id: crypto.randomUUID(),
        companyName: companyName,
        positionTitle: positionTitle,
        mainResp: mainResp,
        dateFrom: dateFrom,
        dateUntil: dateUntil
    };
};

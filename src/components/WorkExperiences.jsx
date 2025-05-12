import React, { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import Container from './Container';
import WorkExperience from './WorkExperience';

export default function WorkExperiences() {
    const [exps, setExps] = useLocalStorageState('workExps',{defaultValue:[createWkExp('IBM', 'Full stack developer', '<p><strong style="color: rgb(0, 0, 0);">Design and Implement Web Applications</strong><span style="color: rgb(0, 0, 0);"> – Collaborated with cross-functional teams to design and implement scalable web applications using React for the frontend and Node.js for the backend, ensuring high performance and responsiveness.</span></p><p><strong style="color: rgb(0, 0, 0);">API Development and Integration</strong><span style="color: rgb(0, 0, 0);"> – Developed and maintained RESTful APIs to enable seamless communication between frontend interfaces and backend services, optimizing data flow and security.</span></p><p><strong style="color: rgb(0, 0, 0);">Cloud Deployment and Management</strong><span style="color: rgb(0, 0, 0);"> – Deployed microservices-based applications on IBM Cloud, leveraging Kubernetes and Docker for containerization and orchestration, ensuring high availability and fault tolerance.</span></p><p><strong style="color: rgb(0, 0, 0);">Database Optimization and Maintenance</strong><span style="color: rgb(0, 0, 0);"> – Managed and optimized SQL and NoSQL databases, implementing indexing and caching strategies to enhance query performance and data integrity.</span></p><p><strong style="color: rgb(0, 0, 0);">Agile Collaboration and Code Review</strong><span style="color: rgb(0, 0, 0);"> – Participated in Agile ceremonies, including daily stand-ups and sprint planning, and conducted code reviews to ensure adherence to IBM\'s coding standards and best practices.</span></p>', '2012-01-01', '2013-03-30')]});
    const [insertVisible, setInsertVisible] = useState(exps.find((exp) => exp.dateFrom === "" ));

    function changeExperience(id, field, newValue)
    {
        const updatedExps = exps.map((exp)=>
            exp.id === id ? {...exp , [field]:newValue} : exp
        );
        setExps(updatedExps);
    }

    function replaceExperience(id, updatedExp)
    {
        const updatedExps = exps.map((exp)=>
            exp.id === id ? updatedExp : exp
        );
        setExps(updatedExps);
    }

    function addExperience()
    {
        if(!insertVisible)
        {
            let newExp = createWkExp();
            setExps([newExp,...exps]);
        }
        setInsertVisible(!insertVisible)
    }

    function removeExperience(id)
    {
        const updatedExps = exps.filter((exp)=>
            exp.id !== id
        );
        setExps(updatedExps);
        setInsertVisible(false);
    }

    function moveUp(id)
    {
        const updatedExps = [ ...exps ];
        const index = updatedExps.findIndex((exp) => exp.id === id);
        if (index > 0) {
            [updatedExps[index - 1], updatedExps[index]] = [updatedExps[index], updatedExps[index - 1]];
        }
        setExps(updatedExps);
    };
    
    function moveDown(id)
    {
        const expsUpdated = [ ...exps ];
        const index = expsUpdated.findIndex((exp) => exp.id === id);
        if (index < expsUpdated.length - 1) {
            [expsUpdated[index + 1], expsUpdated[index]] = [expsUpdated[index], expsUpdated[index + 1]];
        }
        setExps(expsUpdated);
    };

    const hr = <><hr className="border-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 print:hidden" /><hr className="h-px border-gray-300 border-dotted hidden print:block " /></>
    return (
        <Container title="Work experience"  change={{visible:!insertVisible, onClick:(()=>{if(!insertVisible){addExperience()}})}}>
            {exps.map((exp, index) => (
                <React.Fragment key={exp.id}>
                    {(index > 0) && hr}
                    <WorkExperience exp={exp} editing={exp.dateFrom === ""} expChange={changeExperience} expReplace={replaceExperience} expRemove={()=>(removeExperience(exp.id)) } position={{first: index === 0, last: index === exps.length - 1, moveUp, moveDown}} />
                </React.Fragment>
            ))}
        </Container>
    );
}

function createWkExp(companyName = "", positionTitle = "", mainResp = "", dateFrom = "", dateUntil = "") {
    return {
        id: crypto.randomUUID(),
        companyName,
        positionTitle,
        mainResp,
        dateFrom,
        dateUntil
    };
};

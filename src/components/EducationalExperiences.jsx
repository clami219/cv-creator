import React, { useState } from 'react'
import Container from './Container';
import EducationalExperience from './EducationalExperience';

export default function EducationalExperiences() {
    const exps = [
        createEdExp('Politecnico di Milano', 'Master degree in Computer Engineering', '2005-09-01', '2011-03-30')
    ];
    const hr = <hr className="border-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    return (
        <Container title="Educational experience">
            <EducationalExperience exp={{}} editing={true} />
            {hr}
            {exps.map((exp, index) => (
                <React.Fragment key={exp.id}>
                    {(index > 0) && hr}
                    <EducationalExperience exp={exp} />
                </React.Fragment>
            ))}
        </Container>
    );
}

function createEdExp(schoolName, titleOfStudy, dateFrom, dateUntil) {
    return {
        id: crypto.randomUUID(),
        schoolName,
        titleOfStudy,
        dateFrom,
        dateUntil
    };
};

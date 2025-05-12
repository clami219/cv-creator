import React, { useState, useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state';
import Container from './Container';
import EducationalExperience from './EducationalExperience';

export default function EducationalExperiences({countNonPrintable}) {
    const [exps, setExps] = useLocalStorageState('edExps',{defaultValue:[]});
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
            let newExp = createEdExp();
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
        <Container title="Educational experience" change={{visible:!insertVisible, onClick:(()=>{if(!insertVisible){addExperience(); countNonPrintable(1);}})}}>
            {exps.map((exp, index) => (
                <React.Fragment key={exp.id}>
                    {(index > 0) && hr}
                    <EducationalExperience exp={exp} editing={exp.dateFrom === ""} expChange={changeExperience} expReplace={replaceExperience} expRemove={()=>(removeExperience(exp.id))} position={{first: index === 0, last: index === exps.length - 1, moveUp, moveDown}} countNonPrintable={countNonPrintable} />
                </React.Fragment>
            ))}
        </Container>
    );
}

function createEdExp(schoolName = '', titleOfStudy = '', grade = '', dateFrom = '', dateUntil = '') {
    return {
        id: crypto.randomUUID(),
        schoolName,
        titleOfStudy,
        grade,
        dateFrom,
        dateUntil
    };
};

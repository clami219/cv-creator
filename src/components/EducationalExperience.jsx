import Input from "./Input";
import { PencilIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from 'react'

const mandatoryFields = ['schoolName','titleOfStudy','dateFrom','dateUntil'];

export default function EducationalExperience({exp, countNonPrintable, expChange = (()=>{}), expRemove = (()=>{}), expReplace=(()=>{}), expSave=(()=>{}), editing = false, position = {first: false, last: false, moveUp: ()=>{}, moveDown: ()=>{}}}) {
    const [editMode, setEditMode] = useState(editing)
    const dateFrom = new Date(exp.dateFrom);
    const dateFromFormatted = dateFrom.toLocaleDateString('it-IT')
    const dateUntil = new Date(exp.dateUntil);
    const dateUntilFormatted = dateUntil.toLocaleDateString('it-IT')
    
    //Identifying if it is a new experience
    const [newEdExperience, setNewEdExperience] = useState(exp.dateFrom === "");

    //Experience before changes, used to cancel edits
    const [initialExp,setInitialExp] = useState(exp);

    const viewButtons = (touchVisible = true) => (
        <>
            {!position.last && <ChevronDoubleDownIcon
                                            className={"h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-right hidden group-hover/Ed:block" + ( touchVisible ? " touch:block" : " touch:hidden" )}
                                            onClick={() => position.moveDown(exp.id)}
                                />}
            {!position.first && <ChevronDoubleUpIcon
                                            className={"h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-right hidden group-hover/Ed:block" + ( touchVisible ? " touch:block" : " touch:hidden" )}
                                            onClick={() => position.moveUp(exp.id)}
                                />}
            <PencilIcon
                className={"h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-right hidden group-hover/Ed:block" + ( touchVisible ? " touch:block" : " touch:hidden" )}
                onClick={()=>{setEditMode(true); countNonPrintable(1);}}
            />
        </>
    );

    if(editMode) {
        return (
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <Input
                    title="Title of study"
                    value={exp.titleOfStudy}
                    onChange={(e)=>{expChange(exp.id,e.target.name, e.target.value)}}
                    name="titleOfStudy"
                    mandatory={mandatoryFields.indexOf("titleOfStudy") !== -1}
                ></Input>
                <Input
                    title="School name"
                    value={exp.schoolName}
                    onChange={(e)=>{expChange(exp.id,e.target.name, e.target.value)}}
                    name="schoolName"
                    mandatory={mandatoryFields.indexOf("schoolName") !== -1}
                ></Input>
                <Input 
                    title="From"
                    type="date"
                    value={exp.dateFrom}
                    onChange={(e)=>{expChange(exp.id,e.target.name, e.target.value)}}
                    name="dateFrom"
                    mandatory={mandatoryFields.indexOf("dateFrom") !== -1}
                ></Input>
                <Input 
                    title="Until"
                    type="date"
                    value={exp.dateUntil} onChange={(e)=>{expChange(exp.id,e.target.name, e.target.value)}}
                    name="dateUntil"
                    mandatory={mandatoryFields.indexOf("dateUntil") !== -1}
                ></Input>
                <Input 
                    title="Grade"
                    value={exp.grade}
                    onChange={(e)=>{expChange(exp.id,e.target.name, e.target.value)}} 
                    name="grade"
                    mandatory={mandatoryFields.indexOf("grade") !== -1}
                ></Input>
                <div className="flex gap-4">
                    <button 
                        onClick={()=>{
                            if(validate(exp)){
                                setEditMode(false);
                                setInitialExp(exp);
                                setNewEdExperience(false);
                                countNonPrintable(-1);
                                expSave();
                            }}} 
                        className="!bg-sky-500 hover:!bg-sky-800 !text-white"
                    >
                        {newEdExperience? "Insert" : "Save"}
                    </button>
                    <button 
                        onClick={()=>{
                            expRemove();
                            countNonPrintable(-1);
                        }}
                        className={newEdExperience ? "" : "!bg-red-700 hover:!bg-red-800 !text-white"}
                    >
                        {newEdExperience? "Cancel" : "Delete"}
                    </button>
                    {!newEdExperience && <button 
                                            onClick={()=>{
                                                expReplace(exp.id,initialExp);
                                                setEditMode(false);
                                                countNonPrintable(-1);}}
                                        >Cancel</button> }
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className="group/Ed flex flex-col text-left gap-2 mt-0 p-6 pt-2">
                <div className="flex flex-row bg-gray-100 p-2 hidden touch:block print:!hidden">
                    {viewButtons(true)}
                </div>
                <p>
                    <strong className="font-extrabold text-xl">{exp.titleOfStudy}</strong>
                    {viewButtons(false)}
                </p>
                <p>{exp.schoolName} - {dateFromFormatted.toString()} to {dateUntilFormatted.toString()}</p>
                { exp.grade !== "" && <p><strong>Grade: </strong> {exp.grade}</p> }
            </div>
        );
    }
}

function validate(exp)
{
    let feedback = true;

    mandatoryFields.forEach((field) => {
        if(exp[field] === undefined || exp[field] === ""){feedback = false};
    })

    if(!feedback)
        alert("All mandatory fields should be filled!");

    return feedback;
}
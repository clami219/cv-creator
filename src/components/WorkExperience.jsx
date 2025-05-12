import React, { useState } from 'react'
import Input from "./Input";
import TextArea from "./TextArea"
import DOMPurify from "dompurify";
import { PencilIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

const mandatoryFields = ['companyName','positionTitle','mainResp','dateFrom','dateUntil'];

export default function WorkExperience({ exp, countNonPrintable, expChange = (()=>{}), expRemove = (()=>{}), expReplace=(()=>{}), editing = false, position = {first: false, last: false, moveUp: ()=>{}, moveDown: ()=>{}} }) {
    const [editMode, setEditMode] = useState(editing)
    const dateFrom = new Date(exp.dateFrom);
    const dateFromFormatted = dateFrom.toLocaleDateString('it-IT')
    const dateUntil = new Date(exp.dateUntil);
    const dateUntilFormatted = dateUntil.toLocaleDateString('it-IT')

    //Identifying if it is a new experience
    const [newWorkExperience, setNewWorkExperience] = useState(exp.dateFrom === "");

    //Experience before changes, used to cancel edits
    const [initialExp,setInitialExp] = useState(exp);

    if(editMode) {
        return (
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <Input title="Position title" value={exp.positionTitle} onChange={(e)=>{expChange(exp.id,e.target.name,e.target.value)}} name="positionTitle" mandatory={mandatoryFields.indexOf("positionTitle") !== -1}></Input>
                <Input title="Company name" value={exp.companyName} onChange={(e)=>{expChange(exp.id,e.target.name,e.target.value)}} name="companyName" mandatory={mandatoryFields.indexOf("companyName") !== -1}></Input>
                <Input title="From" type="date" value={exp.dateFrom} onChange={(e)=>{expChange(exp.id,e.target.name,e.target.value)}} name="dateFrom" mandatory={mandatoryFields.indexOf("dateFrom") !== -1}></Input>
                <Input title="Until" type="date" value={exp.dateUntil} onChange={(e)=>{expChange(exp.id,e.target.name,e.target.value)}} name="dateUntil" mandatory={mandatoryFields.indexOf("dateUntil") !== -1}></Input>
                <TextArea title="Main responsibilities" value={exp.mainResp} onChange={(e)=>{expChange(exp.id,"mainResp",e)}} name="mainResp" mandatory={mandatoryFields.indexOf("mainResp") !== -1}></TextArea>
                <div className="flex gap-4">
                    <button onClick={()=>{if(validate(exp)){setEditMode(false); setInitialExp(exp); setNewWorkExperience(false); countNonPrintable(-1);}}} className="!bg-sky-500 hover:!bg-sky-800 !text-white">{newWorkExperience? "Insert" : "Save"}</button>
                    <button onClick={()=>{expRemove(); countNonPrintable(-1);}} className={newWorkExperience ? "" : "!bg-red-700 hover:!bg-red-800 !text-white"}>{newWorkExperience? "Cancel" : "Delete"}</button>
                    {!newWorkExperience && <button onClick={()=>{expReplace(exp.id,initialExp); setEditMode(false); countNonPrintable(-1);}} >Cancel</button> }
                </div>
            </div>
        );
    }
    else
    {
        const safeMainResp = DOMPurify.sanitize(exp.mainResp);
        return (
            <div className="group/Work flex flex-col text-left gap-2 mt-0 p-6 pt-2">
                <p>
                    <strong className="font-extrabold text-2xl">{exp.positionTitle}</strong>
                    {!position.last && <ChevronDoubleDownIcon className="h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-right hidden group-hover/Work:block" onClick={() => position.moveDown(exp.id)}/>}
                    {!position.first && <ChevronDoubleUpIcon className="h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-right hidden group-hover/Work:block" onClick={() => position.moveUp(exp.id)}/>}
                    <PencilIcon className="h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-right hidden group-hover/Work:block" onClick={() => {setEditMode(true); countNonPrintable(1);}} />
                </p>
                <p><em>{exp.companyName} - {dateFromFormatted.toString()} to {dateUntilFormatted.toString()}</em></p>
                <p><span className="[&_strong]:!text-gray-800 [&_strong]:dark:!text-gray-100 [&_span]:!text-gray-800 [&_span]:dark:!text-gray-100" dangerouslySetInnerHTML={{ __html: safeMainResp }}></span></p>
            </div>
        );
    }
}

function validate(exp)
{
    let feedback = true;

    mandatoryFields.forEach((field) => {
        if(exp[field] === undefined || exp[field] === "" || exp[field] === "<p><br></p>"){feedback = false};
    })

    if(!feedback)
        alert("All mandatory fields should be filled!");

    return feedback;
}
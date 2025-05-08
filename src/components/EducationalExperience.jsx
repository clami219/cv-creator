import Input from "./Input";

export default function EducationalExperience({exp, editing = false}) {
    const dateFrom = new Date(exp.dateFrom);
    const dateFromFormatted = dateFrom.toLocaleDateString('it-IT')
    const dateUntil = new Date(exp.dateUntil);
    const dateUntilFormatted = dateUntil.toLocaleDateString('it-IT')
    
    if(editing) {
        return (
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <Input title="School name"></Input>
                <Input title="Title of study"></Input>
                <Input title="From" type="date"></Input>
                <Input title="Until" type="date"></Input>
            </div>
        );
    }
    else
    {
        return (
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <p><strong>School name:</strong> {exp.schoolName}</p>
                <p><strong>Title of study:</strong> {exp.titleOfStudy}</p>
                <p><strong>Date of study:</strong> from {dateFromFormatted.toString()} to {dateUntilFormatted.toString()}</p>
            </div>
        );
    }
}
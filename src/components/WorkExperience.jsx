import Input from "./Input";
import TextArea from "./TextArea"
import DOMPurify from "dompurify";

export default function WorkExperience({ exp, editing = false }) {
    const dateFrom = new Date(exp.dateFrom);
    const dateFromFormatted = dateFrom.toLocaleDateString('it-IT')
    const dateUntil = new Date(exp.dateUntil);
    const dateUntilFormatted = dateUntil.toLocaleDateString('it-IT')

    if(editing) {
        return (
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <Input title="Company name"></Input>
                <Input title="Position title"></Input>
                <TextArea title="Main responsibilities"></TextArea>
                <Input title="From" type="date"></Input>
                <Input title="Until" type="date"></Input>
            </div>
        );
    }
    else
    {
        const safeMainResp = DOMPurify.sanitize(exp.mainResp);
        return (
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <p><strong>Company name:</strong> {exp.companyName}</p>
                <p><strong>Position title:</strong> {exp.positionTitle}</p>
                <p><strong>Main responsibilities:</strong> <span dangerouslySetInnerHTML={{ __html: safeMainResp }}></span></p>
                <p><strong>Period:</strong> from {dateFromFormatted.toString()} to {dateUntilFormatted.toString()}</p>
            </div>
        );
    }
}
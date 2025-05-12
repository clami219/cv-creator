import { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import Input from './Input';
import Container from './Container';
import { PencilIcon } from "@heroicons/react/24/outline";

export default function GeneralInformation() {
    const [data,setData] = useLocalStorageState("generalInfo",{defaultValue:{name:'',surname:'',email:'',phone:'',linkedin:''}});
    const [editMode,setEditMode] = useState(data.name === '' && data.surname === '');

    //General information before changes, used to cancel edits
    const [initialData,setInitialData] = useState(data);

    function updateValue(e)
    {
        const updatedData = {...data,[e.target.name]:e.target.value}
        setData(updatedData);
    }   

    if(editMode)
        return (
        <Container title="General information">
            <div className="flex flex-col text-left gap-4 mt-0 p-6 pt-2">
                <Input
                    title="Name"
                    autocomplete="on"
                    name="name"
                    value={data.name}
                    onChange={(e)=>{updateValue(e)}}
                />
                <Input
                    title="Surname"
                    autocomplete="on"
                    name="surname"
                    value={data.surname}
                    onChange={(e)=>{updateValue(e)}}
                />
                <Input
                    title="Email"
                    autocomplete="email"
                    name="email"
                    value={data.email}
                    onChange={(e)=>{updateValue(e)}}
                />
                <Input
                    title="Phone"
                    autocomplete="phone"
                    name="phone"
                    value={data.phone}
                    onChange={(e)=>{updateValue(e)}}
                />
                <Input
                    title="Linkedin"
                    autocomplete="linkedin"
                    name="linkedin"
                    value={data.linkedin}
                    onChange={(e)=>{updateValue(e)}}
                />
            </div>
            <div className="flex gap-4">
                <button className="!bg-sky-500 hover:!bg-sky-800 !text-white" onClick={()=>{setInitialData(data);setEditMode(false);}}>Save</button>
                <button onClick={()=>{setData(initialData);setEditMode(false)}} >Cancel</button>
            </div>
        </Container>
        );
    else
    return (
        <div className="group flex flex-col text-right gap-0 mt-0 p-6 pt-2 pb-0">
            <p><PencilIcon className="h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer float-left hidden group-hover:block" onClick={() => {setEditMode(true)}} /><strong className="font-extrabold text-4xl">{data.name} {data.surname}</strong></p>
            <p><em>Email:</em> {data.email}</p>
            <p><em>Phone:</em> {data.phone}</p>
            {data.linkedin !== '' && <p><em>Linkedin:</em> {data.linkedin}</p>}
        </div>
        );    
}
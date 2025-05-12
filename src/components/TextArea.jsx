import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../styles/TextArea.css';

export default function TextArea({ title, name=title, value, placeholder = "", type = "text", onChange = (() => { }), mandatory = false}) {
    const modules = {
        toolbar: [
            ["bold","italic","underline"],
            [{list: "ordered"},{list: "bullet"}]
        ]
    };

    return (
        <div className="flex flex-col md:flex-row md:w-150 lg:w-211 text-left md:items-center md:gap-4">
            <label htmlFor={name} className="w-40 md:w-24 text-sm text-left font-medium text-gray-900 dark:text-white">
                {title}{mandatory && "*"}
            </label>
            <div className="flex flex-col mt-2 w-full max-w-full h-60 border border-gray-300 rounded-lg overflow-scroll has-[:focus-within]:outline-2 has-[:focus-within]:-outline-offset-2 has-[:focus-within]:outline-indigo-600">
                <ReactQuill
                    id={name}
                    value={value}
                    onChange={onChange}
                    className="w-full md:w-123 lg:w-183 min-w-0 h-30 flex-1 bg-white border-none pb-5 prose"
                    placeholder={"- ...\n- ...\n- ...\n- ..."}
                    modules={modules}
                />
            </div>
        </div>
    );
}
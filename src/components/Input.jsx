

export default function Input({title, name=title, value, placeholder = "", type = "text", autocomplete = "", onChange = (() => {}), mandatory = false}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <label htmlFor={name} className="w-40 md:w-24 text-sm text-left font-medium text-gray-900 dark:text-white">
                {title}{mandatory && "*"}
            </label>
            <div className="mt-2">
                <div className="flex md:items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        autoComplete={autocomplete}
                        className="block w-40 sm:w-40 md:w-120 lg:w-180 min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        onChange = {onChange}
                    />
                </div>
            </div>
        </div>
    );
}
import { PlusIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Container({children, title, change = {visible:false}})
{
    return (
        <div className="group flex flex-col md:w-180 lg:w-250 gap-2 mt-6 border border-gray-300 border-dotted rounded-lg p-6 pt-2">
            <div className="flex place-content-center justify-between mt-4 mb-0">
                <h2 className="text-xl text-left font-semibold mb-4">
                    {title}:
                </h2>
                <div className={`flex gap-4 hidden print:!hidden ${change.visible ? 'group-hover:block touch:block' : 'group-hover:hidden'}`}>
                    <PlusIcon
                        className="h-6 w-6 text-gray-500 hover:text-indigo-500 cursor-pointer"
                        onClick={change.onClick}
                    />
                </div>
            </div>
            {children}
        </div>
    )
}

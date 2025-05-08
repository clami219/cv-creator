export default function Container({children, title})
{
    return (
        <div className="flex flex-col md:w-180 lg:w-250 gap-4 mt-6 border border-gray-300 border-dotted rounded-lg p-6 pt-2">
            <h2 className="text-xl text-left font-semibold mb-2">{title}:</h2>
            {children}
        </div>
    )
}
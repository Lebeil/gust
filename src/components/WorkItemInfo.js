const WorkItemInfo = ({ tags }) => {
    return (
        <div
            className={`
                w-full p-[var(--tw-4)] absolute bottom-0 left-0
                md:p-[var(--tw-6)]
            `}
            >
            <ul
                className="
                    flex flex-wrap gap-2 p-0
                    md:gap-[var(--tw-4)]
                "
            >
                {
                    tags?.map((tag, index) => <li key={index} className={`text-[0.75rem] md:text-lg px-4 py-1 rounded-lg bg-white bg-opacity-20 backdrop-brightness-50`}>{tag}</li>)
                }
            </ul>
        </div>
    )
}

export default WorkItemInfo
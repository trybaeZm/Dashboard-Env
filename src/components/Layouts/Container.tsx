const Container = ({ children }: { children: any }) => {
    return (
        <div className="grid grid-cols-12 gap-4 p-4 relative">
            {/* Left Spacer: hides on small screens, appears on md+ */}
            <div className="hidden md:block md:col-span-1 "></div>

            {/* Centered Content */}
            <div className="col-span-12  w-full md:col-span-10  mx-auto">
                {/* Centered content goes here */}
                {children}
            </div>

            {/* Right Spacer: hides on small screens, appears on md+ */}
            <div className="hidden md:block md:col-span-1 "></div>
        </div>
    )
}

export default Container
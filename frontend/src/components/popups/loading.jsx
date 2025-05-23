const LoadingPopup = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-0 flex justify-center items-center">
            <div className="bg-transparent w-40 h-40 flex flex-col justify-center items-center rounded-full">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 animate-spin mt-4 rounded-full"></div>
            </div>
        </div>
    );
};

export default LoadingPopup;
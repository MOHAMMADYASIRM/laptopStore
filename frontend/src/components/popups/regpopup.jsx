const RegPopUp = ({ message }) => {
    if (!message) return null;

    return (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg">
            {message}
        </div>
    );
};

export default RegPopUp;

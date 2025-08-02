import React from "react";

const Result = () => {

    const thead = []

    return (
        <div className="h-screen bg-blue-100">
            <h1 className="text-center">Result</h1>
            <Table thead={thead} />
        </div>
    );
};

export default Result;

import React from "react";
import {clsx} from "clsx"

const Card = ({ className, name, value }) => {
    return (
        <div className={clsx(className)}>
            <h2 className="text-4xl font-bold">{value}</h2>
            <h4 className="text-lg font-alata">{name}</h4>
        </div>
    );
};

export default Card;

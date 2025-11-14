import React from "react";



export const StatCards = () => { 
    return (
        <>
            <Card 
                title="Total Expenses"
                value="$5,024"
                pillText="+12.5%"
                trend="up"
                period="From Aug 1 to May 1"
            />
            <Card 
            title="Monthly Expenses"
                value="$2,024"
                pillText="+10.5%"
                trend="up"
                period="From Aug 1 to May 1"/>
            <Card
            title="Total Income"
                value="$25,024"
                pillText="+10.5%"
                trend="up"
                period="Previous 30 days"/>
        </>
    );
};

const Card=({ //passing props for the card
    title,
    value,
    pillText,
    trend,
    period,
}) => {

    return(
        <div className=" p-4 bg-black col-span-4 ">
            
        </div>
    );
}
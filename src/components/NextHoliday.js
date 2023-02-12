import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { DateTime, Interval } from "luxon";

export default function NextHoliday(props) {
    const formattedHolidays = props.formattedHolidays;

    let closestHoliday;

    /* Looping through the array of holidays and finding the first one that is in the future. */
    for (let i = 0; i < formattedHolidays.length; i++) {
        if (formattedHolidays[i].isFuture === true) {
            closestHoliday = formattedHolidays[i];
            break;
        }
    }

    const formatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const [calculatedTime, setCalculatedTime] = useState("");

    useEffect(() => {
        const getDistanceToHoliday = () => {
            const now = DateTime.utc();
            const holidayDate = DateTime.utc(
                2023,
                closestHoliday.date.datetime.month,
                closestHoliday.date.datetime.day
            );

            const interval = Interval.fromDateTimes(now, holidayDate);
            const intervalInDays = Math.ceil(interval.length("day"));

            setCalculatedTime(intervalInDays);
        };

        getDistanceToHoliday();

        const refreshDistance = setInterval(() => {
            getDistanceToHoliday();
        }, 5000);

        return () => clearInterval(refreshDistance);
    }, [closestHoliday]);

    const nextHoliday = {
        dateString: parseISO(closestHoliday.date.iso).toLocaleDateString(
            "en-GB",
            formatOptions
        ),
        timeFromNow: calculatedTime,
        name: closestHoliday.name,
        nationalHoliday: closestHoliday.type[0] === "National holiday",
    };

    return (
        <section className="flex flex-col items-center gap-3 justify-center text-center">
            <p className="text-3xl font-bold">
                {nextHoliday.timeFromNow}{" "}
                {nextHoliday.timeFromNow > 1 ? "days" : "day"} left till
            </p>
            <p className="font-bold text-5xl">{nextHoliday.name}</p>
            <p className="italic font-bold text-2xl">
                {nextHoliday.nationalHoliday
                    ? "National Holiday"
                    : "Not a holiday"}
            </p>
            <p className="text-2xl">Observed: {nextHoliday.dateString}</p>
        </section>
    );
}

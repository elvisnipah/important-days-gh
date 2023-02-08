import { formatDistanceToNow, isFuture, parseISO, subDays } from "date-fns";
import { useEffect, useState } from "react";

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
    const getNewDate = () => {
      const time = formatDistanceToNow(
        new Date(
          2023,
          closestHoliday.date.datetime.month - 1,
          closestHoliday.date.datetime.day + 1
        )
      );
      setCalculatedTime(time);
    };

    getNewDate();
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
      <p className="text-3xl font-bold">{nextHoliday.timeFromNow} left till</p>
      <p className="font-bold text-5xl">{nextHoliday.name}</p>
      <p className="italic font-bold text-2xl">
        {nextHoliday.nationalHoliday ? "National Holiday" : "Not a holiday"}
      </p>
      <p className="text-2xl">Observed: {nextHoliday.dateString}</p>
    </section>
  );
}

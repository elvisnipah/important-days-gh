import { formatDistanceToNow, isFuture, parseISO, subDays } from "date-fns";

export default function NextHoliday(props) {
  const formattedHolidays = props.holidays.holidays.map((holiday) => {
    return {
      ...holiday,
      isFuture: isFuture(
        new Date(
          holiday.date.datetime.year,
          holiday.date.datetime.month - 1,
          holiday.date.datetime.day
        )
      ),
    };
  });

  let closestHoliday;

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

  const nextHoliday = {
    dateString: parseISO(closestHoliday.date.iso).toLocaleDateString(
      "en-GB",
      formatOptions
    ),
    timeFromNow: formatDistanceToNow(
      new Date(
        2023,
        closestHoliday.date.datetime.month - 1,
        closestHoliday.date.datetime.day + 1
      )
    ),
    name: closestHoliday.name,
    nationalHoliday: closestHoliday.type[0] === "National holiday",
  };

  // console.log(nextHoliday);

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

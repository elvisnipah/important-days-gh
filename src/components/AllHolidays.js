import parseISO from "date-fns/parseISO";

export default function AllHolidays(props) {
  const formatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const listItems = props.holidayData.map((data) => {
    return (
      <li
        key={data.urlid + Math.floor(Math.random() * 128)}
        className="text-xl"
      >
        {`${data.name} - ${parseISO(data.date.iso).toLocaleDateString(
          "en-GB",
          formatOptions
        )}`}
      </li>
    );
  });

  return <ul className="flex flex-col gap-4">{listItems}</ul>;
}

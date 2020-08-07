import dayjs from "dayjs";
import { config } from "../../config";
import clsx from "clsx";

interface TimestampProps {
  date: Date;
  endDate?: Date;
  className?: string;
}

export const Timestamp: React.FC<TimestampProps> = ({
  date,
  endDate,
  className,
}) => {
  const day = dayjs(date);
  const current = endDate && dayjs().isBefore(endDate);
  const endDay = dayjs(current ? new Date() : endDate);

  const hasEndDate = endDate && endDay.isValid();

  const age = day.diff(config.birthday, "year");

  const relevantDate = hasEndDate ? endDay : day;
  const info = hasEndDate ? endDay.diff(day, "month") : age;
  const suffix = hasEndDate ? "months" : "y/o";

  return (
    <div
      className={clsx(
        "py-6 flex items-center group relative h-6 w-20 md:w-24 cursor-default",
        className
      )}
    >
      <div
        className={clsx(
          "absolute transform -translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0",
          "transition-all duration-200 ease-in-out"
        )}
      >
        <span>{info}</span> <span className="text-gray-600">{suffix}</span>
      </div>
      <br />
      <div
        className={clsx(
          "absolute transform group-hover:translate-y-8",
          "transition-all duration-200 ease-in-out opacity-100 group-hover:opacity-0"
        )}
      >
        <span className="text-gray-600">
          {current ? "Now" : relevantDate.format("MMM")}
        </span>{" "}
        <span className="transform group-hover:translate-x-3">
          {!current && relevantDate.format("YYYY")}
        </span>
      </div>
    </div>
  );
};

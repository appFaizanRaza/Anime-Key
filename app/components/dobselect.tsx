"use client";

import { useState } from "react";
import CustomSelect from "./customselect";
import { Days, Months, Years } from "../constants/dob.constants";

export default function DOBSelect() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <CustomSelect
          placeholder="DD"
          value={day}
          onChange={setDay}
          options={Days.map((d) => ({
            label: String(d).padStart(2, "0"),
            value: String(d),
          }))}
        />
      </div>

      <div className="flex-1">
        <CustomSelect
          placeholder="MM"
          value={month}
          onChange={setMonth}
          options={Months.map((m, i) => ({
            label: m,
            value: String(i + 1),
          }))}
        />
      </div>

      <div className="flex-1">
        <CustomSelect
          placeholder="YYYY"
          value={year}
          onChange={setYear}
          options={Years.map((y) => ({
            label: String(y),
            value: String(y),
          }))}
        />
      </div>
    </div>
  );
}

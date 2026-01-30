"use client";

import { useState } from "react";
import { Days, Months, Years } from "../constants/dob.constants";

export default function DOBSelect() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="text-black space-x-6">
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="bg-white px-20 py-4"
      >
        <option value="" disabled hidden>
          DD
        </option>
        {Days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="bg-white px-20 py-4"
      >
        <option value="" disabled hidden>
          MM
        </option>
        {Months.map((m, i) => (
          <option key={m} value={i + 1}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="bg-white px-20 py-4"
      >
        <option value="" disabled hidden>
          YYYY
        </option>
        {Years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

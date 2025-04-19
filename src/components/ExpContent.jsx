import React from "react";

const ExpContent = React.memo(({ expContent }) => {
  const { title, date, responsibilities } = expContent;

  return (
    <section className="card-border rounded-xl p-10" aria-label="Experience Card">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="text-white-50 mt-1">{date}</p>

      <p className="text-white-50 mt-4 mb-2 font-medium">Responsibilities</p>
      <ul className="list-disc ms-5 text-white-50 space-y-1">
        {responsibilities.map((responsibility, index) => (
          <li key={`${index}-${responsibility.slice(0, 20)}`}>
            {responsibility}
          </li>
        ))}
      </ul>
    </section>
  );
});

export default ExpContent;

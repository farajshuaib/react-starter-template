import React from "react";

interface props {
  th: string[];
  children: React.ReactNode;
}

const Table: React.FC<props> = ({ children, th }) => {
  return (
    <div className="relative overflow-x-auto overflow-y-visible border border-gray-200  sm:rounded-lg">
      <table className="w-full text-right bg-white rounded-md">
        <thead>
          <tr className="p-4 border-b border-gray150">
            {th.map((item, index) => (
              <td
                key={index}
                className="px-6 py-3 font-bold text-gray-800 bg-gray-200 whitespace-nowrap"
              >
                {item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;

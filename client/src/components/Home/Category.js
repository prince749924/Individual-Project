import { Input } from "antd";
import React from "react";
import "./Banner";
import "./Home.css";
const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Cars",
    value: "cars",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Real Estate",
    value: "realstate",
  },
  {
    name: "Furnishing",
    value: "furnishing",
  },
  {
    name: "Books",
    value: "books",
  },
  {
    name: "Sports",
    value: "sports",
  },
];

function Filters({ filters, setFilters }) {
  const handleCheckboxChange = (categoryValue, checked) => {
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: [...prevFilters.category, categoryValue],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: prevFilters.category.filter((item) => item !== categoryValue),
      }));
    }
  };

  return (
    <div className=" cat  bg-white  rounded ">
      <div className="w-full flex flex-col">
        <div className="flex flex-row gap-1 mt-2">
          <h3 className="text-gray-600 ms-5">Categories</h3>
          <div className="flex flex-row gap-5 mx-5">
            {categories.map((category) => (
              <div className="flex items-center gap-2" key={category.value}>
                <Input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) =>
                    handleCheckboxChange(category.value, e.target.checked)
                  }
                />
                <label htmlFor={category.value}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;

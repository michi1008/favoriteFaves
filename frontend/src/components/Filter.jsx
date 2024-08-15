import React, { useState } from "react";
import SearchBox from "./SearchBox";
import styled from "styled-components";

const Filter = ({ onChange }) => {
  const [sortBy, setSortBy] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    onChange({ sortBy });
  };

  const clearFilter = () => {
    setSortBy("");
    onChange({ sortBy: "" });
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    onChange({ sortBy: newSortBy });
  };

  return (
    <Wrapper>
      <SearchBox />
      <form className="filter" onSubmit={submitHandler}>
        

        <label>
          <h4>Sort By</h4>
        </label>
        <select
          className="filterOption"
          name="sortBy"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="nameAZ">A to Z</option>
          <option value="nameZA">Z to A</option>
        </select>
        <button className="clearFilterBtn" onClick={clearFilter}>
          Clear Filter
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;

  .filter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .filter h4 {
    color: var(--clr-primary-4);
    font-size: 1.5rem;
    line-height: 0;
    margin-bottom: 0;
  }

  .filterOption {
    padding: 0.5rem;
    background-color: var(--clr-primary-3);
    border: none;
    border-radius: 0.5rem;
    color: var(--clr-white);
    font-size: 1.2rem;
    height: 3rem;
  }

  .filterOption:focus {
    border-color: var(--clr-red); /* Change border color on focus */
    outline: none; 
  }


  /* filter-apply-botton */

  .applyFilterBtn {
    background-color: var(--clr-gold);
    font-size: 1rem;
    height: 3rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .applyFilterBtn:hover {
    background-color: var(--clr-red);
  }

  /* filter-clear-botton */
  .clearFilterBtn {
    background-color: var(--clr-red);
    font-size: 1rem;
    height: 3rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .clearFilterBtn:hover {
    background-color: var(--clr-white);
    color: var(--clr-red);
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 3rem;
    .filter {
      flex-direction: column;
      gap: 3rem;
    }
  }
`;

export default Filter;

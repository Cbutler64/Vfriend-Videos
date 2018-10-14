import React from "react";
import "./SearchForm.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props => (
  <form>
    <div className="form-group">
      <label htmlFor="search">Search:</label>
      <input
        onChange={props.handleInputChange}
        value={props.searchQuery}
        name="searchQuery"
        type="text"
        className="form-control"
        placeholder="Search for a video"
        id="search"
      />
      <button
        onClick={props.handleFormSubmit}
        className="btn btn-info mt-3"
      >
        Search
      </button>
    </div>
  </form>
);

export default SearchForm;


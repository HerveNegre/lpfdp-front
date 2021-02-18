import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Nom</label>
      <input
        type="text"
        className="form-control"
        onChange={(event) => setName(event.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Valider</button>
    </div>
  </form>
);

export default CategoryForm;
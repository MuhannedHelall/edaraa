import React from "react";

function SuperRequestTableItem(props) {
  return (
    <tr>
      <th>{props.id}</th>
      <th>{props.productName}</th>
      <td>{props.requestedQuantity}</td>
      <td>{props.stock}</td>
      <td>{props.AdminName}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editRequest"
        >
          <i className="bi bi-pencil fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          data-bs-toggle="modal"
          data-bs-target="#confirm"
        >
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>
    </tr>
  );
}

export default SuperRequestTableItem;

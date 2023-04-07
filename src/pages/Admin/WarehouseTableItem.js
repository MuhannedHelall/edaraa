import React from "react";
import { Link } from "react-router-dom";

function WarehouseTableItem(props) {
  return (
    <tr>
      <th>{props.id}</th>
      <td>{props.name}</td>
      <td>{props.location}</td>
      <td>{props.status}</td>
      <td>
        <Link to={"/warehouses/" + props.id}>
          <button type="button" className="btn btn-sm btn-outline-primary me-2">
            <i className="bi bi-eye fs-6"></i>
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editWarehouse"
        >
          <i className="bi bi-pencil fs-6"></i>
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger">
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>
    </tr>
  );
}

export default WarehouseTableItem;

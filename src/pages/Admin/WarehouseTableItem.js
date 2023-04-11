import React from "react";
import { Link } from "react-router-dom";

function WarehouseTableItem(props) {
  return (
    <tr>
      <th>{props.index}</th>
      <td>{props.name}</td>
      <td>{props.superName ? props.superName : "Not Assigned"}</td>
      <td>{props.location}</td>
      <td>{props.status ? "Active" : "inActive"}</td>
      <td>
        <button type="button" className="btn btn-sm btn-outline-primary me-2">
          <Link to={"/warehouses/" + props.id}>
            <i className="bi bi-eye fs-6"></i>
          </Link>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editWarehouse"
          onClick={() => props.editModal(props)}
        >
          <i className="bi bi-pencil fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            window.confirm("Are you sure you want to delete this Warehouse?")
              ? props.deleteWarehouse(props.id)
              : null
          }
        >
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>
    </tr>
  );
}

export default WarehouseTableItem;

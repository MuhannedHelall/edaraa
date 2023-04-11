import React from "react";
import { Link } from "react-router-dom";

function SupervisorTableItem(props) {
  const link = () => {
    return (
      <Link
        to={"/warehouses/" + props.warehouseId}
        className="text-decoration-none link-dark"
      >
        {props.warehouseName}
      </Link>
    );
  };
  return (
    <tr>
      <th>{props.index + 1}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.status ? "Active" : "inActive"}</td>
      <td>{props.warehouseId ? link() : "Not Assigned"}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editSupervisor"
          onClick={() => props.editModal(props)}
        >
          <i className="bi bi-pencil fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            window.confirm("Are you sure you want to delete this user?")
              ? props.deleteSuper(props.id)
              : null
          }
        >
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>
    </tr>
  );
}

export default SupervisorTableItem;

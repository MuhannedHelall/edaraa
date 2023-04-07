import React from "react";

function SupervisorTableItem(props) {
  return (
    <tr>
      <th>{props.index+1}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.status? "Active" : "inActive"}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editSupervisor"
          onClick={()=>{props.editModal(props)}}
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

export default SupervisorTableItem;

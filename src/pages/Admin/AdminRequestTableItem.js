import React from "react";

function AdminRequestTableItem(props) {
  const handleApprove = async () => {
    document.getElementById("confirmData" + props.id).classList.remove("d-none");
    document.getElementById("actionData" + props.id).classList.add("d-none");
    document.getElementById("confirmRejection" + props.id).classList.add("d-none");
  };
  const handleReject = () => {
    document.getElementById("confirmData" + props.id).classList.remove("d-none");
    document.getElementById("actionData" + props.id).classList.add("d-none");
    document.getElementById("confirmAcceptance" + props.id).classList.add("d-none");
  };
  const handleConfirmAcceptance = () => {
    console.log("Confirm Acceptance");
  };
  const handleConfirmRejection = () => {
    console.log("Confirm Rejection");
  };
  const handleActionClose = () => {
    document.getElementById("confirmAcceptance" + props.id).classList.remove("d-none");
    document.getElementById("confirmRejection" + props.id).classList.remove("d-none");
    document.getElementById("confirmData" + props.id).classList.add("d-none");
    document.getElementById("actionData" + props.id).classList.remove("d-none");
  };

  return (
    <tr>
      <th>{props.id}</th>
      <td>{props.superName}</td>
      <th>{props.productName}</th>
      <td>{props.requestedQuantity}</td>
      <td>{props.stock}</td>
      <td id={"actionData" + props.id} className="d-flex justify-content-evenly">
        <button
          type="button"
          className="btn btn-sm btn-outline-success col-5"
          onClick={handleApprove}
        >
          <i className="bi bi-check fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger col-5"
          onClick={handleReject}
        >
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>

      <td id={"confirmData" + props.id} className="d-none d-flex justify-content-evenly">
        <button
          type="button"
          className="btn btn-sm btn-success col-8"
          id={"confirmAcceptance" + props.id}
          onClick={handleConfirmAcceptance}
        >
          <i className="bi bi-check2 fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger col-8"
          id={"confirmRejection" + props.id}
          onClick={handleConfirmRejection}
        >
          <i className="bi bi-trash fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary col-3"
          onClick={handleActionClose}
        >
          <i className="bi bi-x fs-6"></i>
        </button>
      </td>
    </tr>
  );
}

export default AdminRequestTableItem;

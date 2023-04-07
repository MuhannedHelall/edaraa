import React, { useState } from "react";
import AdminRequestTableItem from "./AdminRequestTableItem";
import SuperRequestTableItem from "./SuperRequestTableItem";
import userData from "../../data/userData";

function Requests() {
  const [items, setItems] = useState(userData.requests);

  const Admin = () => {
    return (
      <table className="table table-striped table-bordered table-hover text-center my-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Requested Quantity</th>
            <th>Stock Quantity</th>
            <th>Supervisor Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item) => {
            return (
              <AdminRequestTableItem
                key={item.id}
                id={item.id}
                productName={item.productName}
                superName={item.superName}
                requestedQuantity={item.requestedQuantity}
                stock={item.stock}
              />
            );
          })}
        </tbody>
      </table>
    );
  };
  const Supervisor = () => {
    return (
      <>
        <table className="table table-striped table-bordered table-hover text-center my-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Requested Quantity</th>
              <th>Stock Quantity</th>
              <th>Admin Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {items.map((item) => {
              return (
                <SuperRequestTableItem
                  key={item.id}
                  id={item.id}
                  productName={item.productName}
                  requestedQuantity={item.requestedQuantity}
                  stock={item.stock}
                  AdminName={item.superName}
                />
              );
            })}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="editRequest"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="addStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="addStock"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-dark px-4">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-bell mx-2"></i>
          Requests
        </h1>
      </div>

      {userData.type === "Admin" ? Admin() : Supervisor()}

      <div
        className="modal fade"
        id="confirm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirmation Message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h1 className="text-center">Are you sure ?</h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-dark px-2">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Requests;

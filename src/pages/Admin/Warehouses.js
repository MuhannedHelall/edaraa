import React, { useState } from "react";
import WarehouseTableItem from "./WarehouseTableItem";
import warehouseTableData from "../../data/warehouseTableData";

function Warehouses() {
  const [items, setItems] = useState(warehouseTableData);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-houses-fill mx-2"></i>
          Warehouses
        </h1>
        <button
          className="btn btn-sm btn-outline-dark rounded"
          data-bs-toggle="modal"
          data-bs-target="#addWarehouse"
        >
          <i className="bi bi-house-add-fill fs-4"></i>
        </button>
      </div>

      <table
        className="table table-striped table-bordered table-hover text-center my-3"
        style={{ cursor: "pointer" }}
      >
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {items.map((item) => {
            return (
              <WarehouseTableItem
                key={item.id}
                id={item.id}
                name={item.name}
                location={item.location}
                status={item.status}
                products={item.products}
              />
            );
          })}
        </tbody>
      </table>

      {/* <!-- Modals --> */}
      <div
        className="modal fade"
        id="addWarehouse"
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
                Add Warehouse
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="addWarehouseName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addWarehouseName"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addWarehouseLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addWarehouseLocation"
                  />
                </div>
              </form>
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
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editWarehouse"
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
                Edit Warehouse
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editWarehouseName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editWarehouseName"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editLocation"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select className="form-select" id="status">
                    <option defaultValue>Choose from menu</option>
                    <option value="active">Active</option>
                    <option value="inActive">Inactive</option>
                  </select>
                </div>
              </form>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Warehouses;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import WarehouseTableItem from "./WarehouseTableItem";
import ErrorHandler from "./../../components/ErrorHandler";

function Warehouses() {
  if (Cookies.get("isAdmin").toLowerCase() !== "true")
    window.location.replace("/NotFound");

  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/getWarehouses")
      .then((response) => response.json())
      .then((data) => setWarehouses(data));
  }, []);

  const [supervisors, setSupervisors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/getInActiveSupervisors")
      .then((response) => response.json())
      .then((data) => setSupervisors(data.supervisor));
  }, []);

  const addWarehouse = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/addWarehouse", {
      method: "POST",
      body: JSON.stringify({
        name: event.target[1].value,
        location: event.target[2].value,
        userID: event.target[3].value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        data.error ? ErrorHandler(data.error) : window.location.reload()
      )
      .catch((error) => console.error(error));
  };
  const editWarehouse = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/updateWarehouse/" + event.target[1].value, {
      method: "PUT",
      body: JSON.stringify({
        name: event.target[2].value,
        UserId: event.target[3].value,
        location: event.target[4].value,
        isActive: event.target[5].value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.error ? ErrorHandler(data.error) : window.location.reload();
      })
      .catch((error) => console.error(error));
  };
  const deleteWarehouse = (id) => {
    fetch("http://localhost:8000/deleteWarehouse/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.error ? ErrorHandler(data.error) : window.location.reload();
      })
      .catch((error) => console.error(error));
  };
  const editWarehouseModal = (warehouse) => {
    document.getElementById("warehouseId").value = warehouse.id;
    document.getElementById("editWarehouseName").value = warehouse.name;

    let superSelect = document.getElementById("editWarehouseSuper");
    for (let i = 0; i < superSelect.length; i++)
      if (
        parseInt(superSelect.children[i].value) === parseInt(warehouse.superId)
      )
        superSelect.children[i].setAttribute("selected", "");

    document.getElementById("editWarehouseLocation").value = warehouse.superId;
    document.getElementById("editWarehouseLocation").value = warehouse.location;
    let option = document.getElementById("editWarehouseStatus").children[1];
    if (!warehouse.status) option.setAttribute("selected", "");
  };

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
            <th>Supervisor Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {warehouses.map((warehouse, index) => {
            return (
              <WarehouseTableItem
                key={warehouse.id}
                id={warehouse.id}
                index={index + 1}
                name={warehouse.name}
                superName={warehouse.User.name}
                superId={warehouse.User.id}
                location={warehouse.location}
                status={warehouse.isActive}
                products={warehouse.products}
                editModal={editWarehouseModal}
                deleteWarehouse={deleteWarehouse}
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
            <form onSubmit={(e) => addWarehouse(e)}>
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
                <div className="mb-3">
                  <label htmlFor="addWarehouseSuper" className="form-label">
                    Supervisor
                  </label>
                  <select className="form-select" id="addWarehouseSuper">
                    {supervisors.map((supervisor) => {
                      return (
                        <option key={supervisor.id} value={supervisor.id}>
                          {supervisor.name}
                        </option>
                      );
                    })}
                  </select>
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
                <button
                  type="submit"
                  className="btn btn-dark px-4"
                  data-bs-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </form>
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
            <form onSubmit={(e) => editWarehouse(e)}>
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
                <input type="hidden" id="warehouseId" />
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
                  <label htmlFor="editWarehouseSuper" className="form-label">
                    Supervisor
                  </label>
                  <select className="form-select" id="editWarehouseSuper">
                    {supervisors.map((supervisor) => {
                      return (
                        <option key={supervisor.id} value={supervisor.id}>
                          {supervisor.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="editWarehouseLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editWarehouseLocation"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editWarehouseStatus" className="form-label">
                    Status
                  </label>
                  <select className="form-select" id="editWarehouseStatus">
                    <option value="true">Active</option>
                    <option value="false">inActive</option>
                  </select>
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
}

export default Warehouses;

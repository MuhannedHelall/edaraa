import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SupervisorTableItem from "./SupervisorTableItem";
import ResHandler from "../../components/ResHandler";

function Supervisors() {
  const navigate = useNavigate();
  if (Cookies.get("isAdmin") !== "true") navigate("/NotFound");

  const [users, setUsers] = useState([]);
  useEffect(() => getAllSupervisors());

  const getAllSupervisors = () => {
    fetch("http://localhost:8000/getAllSupervisors")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  const addSupervisor = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/addSupervisor", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("addSuperName").value,
        email: document.getElementById("addSuperEmail").value,
        password: document.getElementById("addSuperPassword").value,
        phone: document.getElementById("addSuperPhone").value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllSupervisors();
        data.errors
          ? data.errors.map((err) => ResHandler(err, "danger"))
          : ResHandler(data.message);
        document.getElementById("addSuperName").value = "";
        document.getElementById("addSuperEmail").value = "";
        document.getElementById("addSuperPassword").value = "";
        document.getElementById("addSuperPhone").value = "";
      })
      .catch((error) => console.error(error));
  };
  const updateSupervisor = (event) => {
    event.preventDefault();
    fetch(
      "http://localhost:8000/updateSupervisor/" +
        document.getElementById("superId").value,
      {
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("editSuperName").value,
          email: document.getElementById("editSuperEmail").value,
          phone: document.getElementById("editSuperPhone").value,
          password: document.getElementById("editSuperPassword").value,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        getAllSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };
  const deleteSupervisor = (supervisor) => {
    fetch("http://localhost:8000/deleteSupervisor/" + supervisor.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : setWarehouseInActive(supervisor.warehouseId, data.message);
      })
      .catch((error) => console.error(error));
  };
  const editSupervisorModal = (supervisor) => {
    document.getElementById("superId").value = supervisor.id;
    document.getElementById("editSuperName").value = supervisor.name;
    document.getElementById("editSuperEmail").value = supervisor.email;
    document.getElementById("editSuperPhone").value = supervisor.phone;
  };
  const setWarehouseInActive = (id, msg) => {
    fetch("http://localhost:8000/setWarehouseInActive/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.error ? ResHandler(data.error, "danger") : ResHandler(msg);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-people mx-2"></i>
          Supervisors
        </h1>
        <button
          className="btn btn-sm btn-outline-dark rounded"
          data-bs-toggle="modal"
          data-bs-target="#addSupervisor"
        >
          <i className="bi bi-person-add fs-4"></i>
        </button>
      </div>

      <table className="table table-striped table-bordered table-hover text-center my-3">
        <thead className="table-dark">
          <tr>
            <th className="col-1">#</th>
            <th className="col-2">Name</th>
            <th className="col-2">Email</th>
            <th className="col-2">Phone</th>
            <th className="col-1">Status</th>
            <th className="col-2">Warehouse Name</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {users.map((user, index) => {
            return (
              <SupervisorTableItem
                key={user.id}
                id={user.id}
                index={index}
                name={user.name}
                email={user.email}
                password={user.password}
                phone={user.phone}
                status={user.isActive}
                warehouseId={user.Warehouses[0]?.id}
                warehouseName={user.Warehouses[0]?.name}
                editModal={editSupervisorModal}
                deleteSuper={deleteSupervisor}
              />
            );
          })}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="addSupervisor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={(e) => addSupervisor(e)}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Supervisor
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
                  <label htmlFor="addSuperName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addSuperName"
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSuperEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="addSuperEmail"
                    aria-describedby="emailHelp"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSuperPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="addSuperPassword"
                    name="password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSuperPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addSuperPhone"
                    name="phone"
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
        id="editSupervisor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={(e) => updateSupervisor(e)}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Supervisor
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="hidden" id="superId" />
                <div className="mb-3">
                  <label htmlFor="editSuperName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editSuperName"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editSuperEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="editSuperEmail"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editSuperPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editSuperPhone"
                    required
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-outline-dark my-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#editPassword"
                    aria-expanded="false"
                    aria-controls="collapseWidthExample"
                  >
                    Change Password
                  </button>
                  <div
                    id="editPassword"
                    className="collapse collapse-horizontal"
                  >
                    <div style={{ width: "465px" }}>
                      <label htmlFor="editSuperPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="editSuperPassword"
                      />
                    </div>
                  </div>
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

export default Supervisors;

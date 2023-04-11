import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SupervisorTableItem from "./SupervisorTableItem";
import ErrorHandler from "./../../components/ErrorHandler";

function Supervisors() {
  if (Cookies.get("isAdmin").toLowerCase() !== "true")
    window.location.replace("/NotFound");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/getAllSupervisors")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

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
        data.errors
          ? data.errors.map((err) => ErrorHandler(err))
          : window.location.reload();
      })
      .catch((error) => console.error(error));
  };
  const updateSupervisor = (event) => {
    const supervisor = {
      name: document.getElementById("editSuperName").value,
      email: document.getElementById("editSuperEmail").value,
      phone: document.getElementById("editSuperPhone").value,
      isActive: document.getElementById("editSuperStatus").value,
      password: document.getElementById("editSuperPassword").value,
    };
    console.log(supervisor);
    fetch(
      "http://localhost:8000/updateSupervisor/" +
        document.getElementById("superId").value,
      {
        method: "POST",
        body: JSON.stringify(supervisor),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.error ? ErrorHandler(data.error) : window.location.reload();
      })
      .catch((error) => console.error(error));
  };
  const deleteSupervisor = (id) => {
    fetch("http://localhost:8000/deleteSupervisor/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.error ? ErrorHandler(data.error) : window.location.reload();
      })
      .catch((error) => console.error(error));
  };
  const editSupervisorModal = (supervisor) => {
    document.getElementById("superId").value = supervisor.id;
    document.getElementById("editSuperName").value = supervisor.name;
    document.getElementById("editSuperEmail").value = supervisor.email;
    document.getElementById("editSuperPhone").value = supervisor.phone;
    let option = document.getElementById("editSuperStatus").children[1];
    if (supervisor.status === false) option.setAttribute("selected", "");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap pb-3 mb-2 border-bottom">
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
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Warehouse Name</th>
            <th>Action</th>
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
                  <label htmlFor="editSuperStatus" className="form-label">
                    Status
                  </label>
                  <select id="editSuperStatus" className="form-select" required>
                    <option value="true">Active</option>
                    <option value="false">inActive</option>
                  </select>
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

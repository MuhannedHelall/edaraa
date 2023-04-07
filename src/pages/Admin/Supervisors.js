import React, { useState, useEffect } from "react";
import SupervisorTableItem from "./SupervisorTableItem";

function Supervisors() {
  const form = document.getElementById("addSupervisor");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("http://localhost:8000/addUser", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });

  /////////////////////////////////////////////////////
  const [users, setUsers] = useState([]);

  const getSupervisors = async () => {
    const response = await fetch("http://localhost:8000/getAllUsers").then(
      (response) => response.json()
    );
    setUsers(response);
  };

  useEffect(() => {
    getSupervisors();
  }, []);

  const editSupervisorModal = (supervisor) => {
    document.getElementById("editSuperName").value = supervisor.name;
    document.getElementById("editSuperEmail").value = supervisor.email;
    document.getElementById("editSuperPhone").value = supervisor.phone;
    let option = document.getElementById("editSuperStatus").children[1];
    if (supervisor.status === false) option.setAttribute("selected", "");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-people mx-2"></i>
          Supervisors
        </h1>
        <button
          className="btn btn-sm btn-outline-dark rounded-circle"
          data-bs-toggle="modal"
          data-bs-target="#addSupervisor"
        >
          <i className="bi bi-person-add fs-4"></i>
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
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {users.map((user, index) => {
            return (
              <SupervisorTableItem
                key={user.id}
                index={index}
                name={user.name}
                email={user.email}
                password={user.password}
                phone={user.phone}
                status={user.isActive}
                editModal={editSupervisorModal}
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
            <form id="addSupervisor" action="">
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
                <button type="submit" className="btn btn-dark px-4">
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
            <form method="POST" action="">
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
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="editSuperPassword" className="form-label">
                      Password
                    </label>
                    <button
                      class="btn btn-sm btn-outline-dark my-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#editSuperPassword"
                      aria-expanded="false"
                      aria-controls="collapseWidthExample"
                    >
                      Toggle width collapse
                    </button>
                  </div>
                  <input
                    type="password"
                    className="form-control collapse collapse-horizontal"
                    id="editSuperPassword"
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

export default Supervisors;

import React from "react";
import img from "../../assets/imgs/1.jpg";

function SupervisorProductItem(props) {
  return (
    <div className="col-4">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.img}
              className="img-fluid rounded-start border h-100"
              alt="..."
            />
          </div>
          <input type="hidden" id="productId" value={props.id} />
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-center">{props.name}</h5>
              <p className="card-text" style={{ textAlign: "justify" }}>
                {props.description}
              </p>
              <div className="d-flex justify-content-around align-items-center">
                <span className="card-text">
                  <small className="text-body-secondary">
                    {"Stock: " + props.stock}
                  </small>
                </span>
                <button
                  type="type"
                  className="btn btn-sm btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#makeRequest"
                  onClick={() => props.getRequestData(props.id)}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorProductItem;

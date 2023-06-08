import React from "react";

const RequestForm = ({ handleUpdatedReq, value, setValue, name, setName }) => {
  return (
    <>
      <form onSubmit={handleUpdatedReq}>
        <div className="m-1 w-75">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdatedReq}>
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RequestForm;

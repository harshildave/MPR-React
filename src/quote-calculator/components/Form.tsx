import { useState } from "react";
import { exit_points, furnaces, locations } from "../constants";

interface Props {
  onSquareFootageChange: (data: number) => void;
  onNoOfFurnaceChange: (data: string) => void;
  onFurnaceLocationChange: (data: string) => void;
  onExitPointChange: (data: string) => void;
  noOfFurnace: string;
}

function Form({
  onSquareFootageChange,
  onNoOfFurnaceChange,
  onFurnaceLocationChange,
  onExitPointChange,
  noOfFurnace,
}: Props) {
  const [showDryer, setShowDryer] = useState("");
  const handleShowDryerChange = (data: string) => {
    if (data != "yes") onExitPointChange("");
    setShowDryer(data);
  };
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="square_footage" className="form-label">
          Sq Footage
        </label>
        <input
          id="square_footage"
          type="number"
          className="form-control"
          onBlur={(event) =>
            onSquareFootageChange(parseInt(event.target.value))
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="no_of_furnace" className="form-label">
          Number of Furnace
        </label>
        <select
          id="no_of_furnace"
          className="form-select"
          onChange={(event) => onNoOfFurnaceChange(event.target.value)}
        >
          <option value="" key="">
            Select Option
          </option>
          {furnaces.map((furnace) => (
            <option value={furnace} key={furnace}>
              {furnace}
            </option>
          ))}
        </select>
      </div>
      {(noOfFurnace == "2" || noOfFurnace == "3+") && (
        <div className="mb-3">
          <label htmlFor="furnace_location" className="form-label">
            Are your Furnaces ...?
          </label>
          <select
            className="form-select"
            onChange={(event) => onFurnaceLocationChange(event.target.value)}
          >
            <option value="" key="">
              Select Option
            </option>
            {locations.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="no_of_furnace" className="form-label">
          Add Dyer Vent Cleaning ?
        </label>
        <select
          className="form-select"
          onChange={(event) => handleShowDryerChange(event.target.value)}
        >
          <option value="" key="">
            Select Option
          </option>
          <option value="yes" key="yes">
            Yes
          </option>
          <option value="no" key="no">
            No
          </option>
        </select>
      </div>
      {showDryer == "yes" && (
        <div className="mb-3">
          <label htmlFor="exit_point" className="form-label">
            Dryer exit point
          </label>
          <select
            id="exit_point"
            className="form-select"
            onChange={(event) => onExitPointChange(event.target.value)}
          >
            <option value="" key="">
              Select Option
            </option>
            {exit_points.map((exit_point) => (
              <option value={exit_point} key={exit_point}>
                {exit_point}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Form;

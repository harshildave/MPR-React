import { useState, useEffect } from "react";
import Form from "./quote-calculator/components/Form";
import quoteService, { QuoteReq, QuoteRes } from "./services/quote-service";

function App() {
  const [quoteObj, setquoteObj] = useState({
    square_footage: 0,
    no_of_furnace: "",
    furnace_location: "",
    exit_point: "",
  });

  const [qoute, setQuote] = useState<QuoteRes>();
  const [showQuote, setShowQuote] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [callApi, setCallApi] = useState(false);

  const handleFormChange = (key: string, value: string | number) => {
    setCallApi(true);
    setShowMessage(false);
    setShowQuote(false);

    switch (key) {
      case "square_footage":
        if (typeof value == "number" && value >= 5000) {
          setShowMessage(true);
          return;
        }
        break;
      case "no_of_furnace":
        if (value == "3+") {
          setShowMessage(true);
          return;
        }
        break;
    }

    setquoteObj({ ...quoteObj, [key]: value });
  };

  // after render
  useEffect(() => {
    if (callApi) {
      // get -> promise -> res/err
      quoteService
        .getQuote<QuoteReq>(quoteObj)
        .then((res) => {
          setQuote(res.data);
          setShowQuote(true);
        })
        .catch((err) => {
          // setError(err.message);
          setShowQuote(false);
        });
    }
  }, [quoteObj]);

  return (
    <div>
      <div className="mb-5">
        <Form
          onSquareFootageChange={(sq_foot: number) =>
            handleFormChange("square_footage", sq_foot)
          }
          onNoOfFurnaceChange={(furnace: string) =>
            handleFormChange("no_of_furnace", furnace)
          }
          onFurnaceLocationChange={(location: string) =>
            handleFormChange("furnace_location", location)
          }
          onExitPointChange={(exit_point: string) =>
            handleFormChange("exit_point", exit_point)
          }
          noOfFurnace={quoteObj.no_of_furnace}
        />
      </div>

      {showQuote && (
        <div className="alert alert-success" role="alert">
          <h4>
            {qoute &&
              "AIR DUCT CLEANING QUOTE: $" + qoute.data.air_duct_cleaning_price}
          </h4>
          <h4>
            {qoute &&
              qoute.data.dryer_vent_cleaning_price &&
              "DRYER VENT CLEANING QUOTE: $" +
                qoute.data.dryer_vent_cleaning_price}
          </h4>
          <h2>{qoute && "TOTAL: $" + qoute.data.total}</h2>
        </div>
      )}
      {showMessage && (
        <div className="alert alert-warning" role="alert">
          <h4>
            FOR HOMES 5,000 SQUARE FEET OR LARGER OR FOR EARLIER APPOINTMENTS
            EMAIL INFO@AMISTEE.COM OR CALL 877.349.8877
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/configStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import * as signalR from "@aspnet/signalr";
// import { DOMAIN } from "./util/settings/config";
import "./i18n";

// export const connection = new signalR.HubConnectionBuilder()
//   .withUrl(`${DOMAIN}/DatVeHub`)
//   .configureLogging(signalR.LogLevel.Information)
//   .build();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

// connection
//   .start()
//   .then(() => {
//     const root = ReactDOM.createRoot(document.getElementById("root"));
//     root.render(
//       <>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </>
//     );
//   })
//   .catch((errors) => {
//     console.log(errors);
//   });

reportWebVitals();

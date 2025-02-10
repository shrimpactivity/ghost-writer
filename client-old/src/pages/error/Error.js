import React from 'react';
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

  return (
    <div id="error-page" style={{color: 'white'}}>
      <h1>Uh oh</h1>
      <p>404: Page not found</p>
    </div>
  );
}

export default ErrorPage;
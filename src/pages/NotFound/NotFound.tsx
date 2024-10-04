import { useRouteError } from "react-router-dom";

const NotFoundPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Not Found</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export default NotFoundPage;

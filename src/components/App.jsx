import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage/HomePage";
import { TweetsPage } from "../Pages/TweetsPage/TweetsPage";
import { Layout } from "./Layout/Layout";

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="tweets"
            element={<TweetsPage />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EmployeeList from "./EmployeeList";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/employeeList",
      element: <EmployeeList />
    }
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

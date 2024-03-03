import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";

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
      path: "/createEmployee",
      element: <CreateEmployee />
    },
    {
      path: "/editEmployee/:empId",
      element: <EditEmployee />
    }
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

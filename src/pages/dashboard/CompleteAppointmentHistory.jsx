import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";

const CompleteAppointmentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [completeAppointments, setCompleteAppointments] = useState([]);
  axiosSecure.get("/history").then((res) => {
    setCompleteAppointments(res.data);
  });
  return (
    <div className="-mt-20">
      <Helmet>
        <title>Appointment History</title>
      </Helmet>
      <SectionTitle
        heading={"Appointment History"}
        subHeading={"Review and analyze"}
      />

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>User Email</th>
            <th>Provider Email</th>
            <th>date and time </th>
            <th>paymentId</th>
          </tr>
        </thead>
        <tbody>
          {completeAppointments.map((app, index) => (
            <tr key={app._id}>
              <th>{index + 1}</th>
              <td>{app.category}</td>
              <td>{app.email}</td>
              <td>{app.providerEmail}</td>
              <td>{new Date(app.completedAt).toLocaleString()}</td>
              <td>{app.paymentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompleteAppointmentHistory;

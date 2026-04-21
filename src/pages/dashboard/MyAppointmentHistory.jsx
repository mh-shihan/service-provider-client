import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { FaEye } from "react-icons/fa6";

const MyAppointmentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email; // Optional chaining to avoid errors if user is null
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (email) {
      axiosSecure
        .get("/myAppointCompleteHistory", { params: { email } })
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching appointment history:", error);
        });
    }
  }, [axiosSecure, email]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Booking Date</th>
            <th>Complete Date</th>
            <th>User Email</th>
            <th>Payment Id</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item, index) => {
            // Format the completedAt date for each appointment
            const completedDate = item.completedAt
              ? new Date(item.completedAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"; // Handle cases where completedAt is not available

            return (
              <tr key={item._id || index}>
                <th>{index + 1}</th>
                <td>{item.date}</td>
                <td>{completedDate}</td>
                <td>{item.email}</td>
                <td>{item.paymentId}</td>
                {/* <td>
                  <button
                    className="btn btn-ghost btn-outline btn-success text-xl"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${item._id || index}`)
                        .showModal()
                    }
                  >
                    <FaEye />
                  </button>
                  <dialog
                    id={`my_modal_${item._id || index}`}
                    className="modal"
                  >
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">User Review!</h3>
                      {item.review ? (
                        <p className="py-4">{item.review}</p>
                      ) : (
                        <p>No review available</p>
                      )}
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointmentHistory;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUser";
import Swal from "sweetalert2";

const Room = () => {
  const { roomId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const meetingContainer = useRef(null);
  const navigate = useNavigate();
  const [users] = useUsers();

  useEffect(() => {
    if (!roomId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid room ID.",
      });
      navigate("/dashboard");
      return;
    }

    const fetchAppointment = async () => {
      try {
        const res = await axiosSecure.get(`/appointment/${roomId}`);
        setAppointment(res.data);
      } catch (err) {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to fetch appointment data!",
          });
        }
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [axiosSecure, roomId, navigate]);

  useEffect(() => {
    if (!appointment || !users || !meetingContainer.current) return;

    const initializeMeeting = async () => {
      const appID = Number(import.meta.env.VITE_ZIGO_APPID);
      const serverSecret = import.meta.env.VITE_ZIGO_SERVERSECRET;

      if (!appID || !serverSecret) {
        Swal.fire({
          icon: "error",
          title: "Configuration Error",
          text: "Missing Zego credentials!",
        });
        return;
      }

      try {
        // Generate token for the meeting
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          users._id,
          users.name
        );

        const isProvider = users.role === "provider";

        // Update appointment status
        const updateData = {
          appointmentId: appointment._id,
          isProvider,
          status: isProvider ? "in-progress" : "on-going",
          ...(isProvider && {
            userMeetingLink: `${window.location.origin}/room/${roomId}`,
          }),
        };

        await axiosSecure.patch("/appointmentUpdateWhenJoinRoom", updateData);

        // Initialize meeting
        const meetingInstance = ZegoUIKitPrebuilt.create(kitToken);

        meetingInstance.joinRoom({
          container: meetingContainer.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
          onUserLeft: () => {
            meetingInstance.destroy();
            navigate("/dashboard");
          },
        });

        return () => {
          meetingInstance.destroy();
        };
      } catch (error) {
        console.error("Meeting initialization error:", error);
        Swal.fire({
          icon: "error",
          title: "Meeting Error",
          text: "Failed to initialize the meeting room.",
        });
        navigate("/dashboard");
      }
    };

    initializeMeeting();
  }, [appointment, roomId, navigate, users, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading meeting room...</p>
        </div>
      </div>
    );
  }

  if (!appointment || !users._id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          Failed to load meeting details.
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div ref={meetingContainer} className="w-full h-full" />

      {/* Optional: Add a header with meeting info */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg">
          {users.role === "provider" ? "Provider" : "Client"} Meeting
        </h2>
        <p className="text-sm text-gray-600">Room ID: {roomId}</p>
      </div>
    </div>
  );
};

export default Room;

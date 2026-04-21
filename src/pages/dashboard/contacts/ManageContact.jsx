import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageContact = () => {
  const axiosSecure = useAxiosSecure();
  const [contacts, setContacts] = useState([]);
  const [replays, setReplays] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axiosSecure.get("contacts").then((res) => {
      setContacts(res.data);
    });
  }, [axiosSecure]);

  const handleInputChange = (e, contactId) => {
    setReplays((prev) => ({
      ...prev,
      [contactId]: e.target.value,
    }));
  };

  const handleSendReplay = () => {
    if (!selectedContact || !replays[selectedContact._id]) return;

    const contactInfo = {
      replay: replays[selectedContact._id],
      _id: selectedContact._id,
    };

    axiosSecure
      .patch("/contactReplay", contactInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact._id === selectedContact._id
                ? { ...contact, replay: replays[selectedContact._id] }
                : contact
            )
          );

          setReplays((prev) => ({
            ...prev,
            [selectedContact._id]: "",
          }));

          document.getElementById("reply_modal").close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reply sent successfully",
            showConfirmButton: false,
            timer: 2000,
            background: "#ffffff",
            color: "#1f2937",
            backdrop: "rgba(0, 0, 0, 0.1)",
            customClass: {
              popup: "rounded-xl shadow-xl border border-green-100",
              title: "text-green-800 font-semibold",
              icon: "text-green-500",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <Helmet>
        <title>Manage Contacts</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Manage Contact Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and respond to user inquiries
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Contact Messages
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {contacts.length} total messages
              </p>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {contacts.map((contact, index) => (
                  <tr
                    key={contact._id || index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <div
                        className="max-w-xs truncate"
                        title={contact.message}
                      >
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!contact.replay ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          Replied
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!contact.replay ? (
                        <button
                          className="inline-flex items-center gap-2 px-3 py-2 bg-transparent border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200 hover:scale-105"
                          onClick={() => {
                            setSelectedContact(contact);
                            document.getElementById("reply_modal").showModal();
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                          Reply
                        </button>
                      ) : (
                        <button
                          className="inline-flex items-center gap-2 px-3 py-2 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200 hover:scale-105"
                          onClick={() => {
                            setSelectedContact(contact);
                            document.getElementById("reply_modal").showModal();
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {contacts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No messages found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No contact messages have been received yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedContact && (
        <dialog id="reply_modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Message from {selectedContact.name}
              </h3>
            </div>

            {/* User Message */}
            <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {selectedContact.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {selectedContact.email}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200">
                {selectedContact.message}
              </p>
            </div>

            {/* Show Reply if Available */}
            {selectedContact.replay && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      Admin Reply
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Sent
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  {selectedContact.replay}
                </p>
              </div>
            )}

            {/* Reply Input (Hidden if reply exists) */}
            {!selectedContact.replay && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Reply
                </label>
                <textarea
                  onChange={(e) => handleInputChange(e, selectedContact._id)}
                  placeholder="Type your reply here..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none"
                  rows={4}
                  value={replays[selectedContact._id] || ""}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSendReplay}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Reply
                  </button>
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="modal-action">
              <form method="dialog">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-all duration-200">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageContact;

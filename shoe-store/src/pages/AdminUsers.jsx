import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const promote = async (id) => {
    await fetch(`http://localhost:5000/api/users/make-admin/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    setUsers(users.map((u) => (u._id === id ? { ...u, role: "admin" } : u)));
  };

  const demote = async (id) => {
    await fetch(`http://localhost:5000/api/users/remove-admin/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    setUsers(users.map((u) => (u._id === id ? { ...u, role: "user" } : u)));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this user permanently")) return;

    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border space-x-2">
                {u.role === "user" && (
                  <button
                    onClick={() => promote(u._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Make Admin
                  </button>
                )}

                {u.role === "admin" && (
                  <button
                    onClick={() => demote(u._id)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded"
                  >
                    Remove Admin
                  </button>
                )}

                <button
                  onClick={() => remove(u._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
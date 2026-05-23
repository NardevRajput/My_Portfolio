import { useEffect, useState } from "react";

import { getContacts, deleteContact } from "./adminApi";

import { Trash2, LogOut, Mail, Users, Search, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load contacts");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this contact?");

    if (!confirmDelete) return;
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.log(error);

      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/admin-login";
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* TOP HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="text-zinc-400 mt-2">
            Manage your portfolio contact system
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500/10 p-4 rounded-2xl">
              <Users size={35} className="text-orange-400" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">{contacts.length}</h2>

              <p className="text-zinc-400">Total Contacts</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-blue-500 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-4 rounded-2xl">
              <Mail size={35} className="text-blue-400" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">Active</h2>

              <p className="text-zinc-400">Contact System</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-green-500 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-4 rounded-2xl">
              <ShieldCheck size={35} className="text-green-400" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">Secure</h2>

              <p className="text-zinc-400">JWT Protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <Search className="text-zinc-400" />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-300">
              <th className="text-left py-5 px-3">ID</th>

              <th className="text-left py-5 px-3">Name</th>

              <th className="text-left py-5 px-3">Email</th>

              <th className="text-left py-5 px-3">Message</th>

              <th className="text-left py-5 px-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-all duration-300"
              >
                <td className="py-5 px-3 font-medium">{contact.id}</td>

                <td className="py-5 px-3">{contact.name}</td>

                <td className="py-5 px-3 text-zinc-300">{contact.email}</td>

                <td className="py-5 px-3 max-w-sm">{contact.message}</td>

                <td className="py-5 px-3">
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredContacts.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

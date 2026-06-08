import { useState } from "react";
import Icon from "../destinations/Icon";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../../firebase/Auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { initials } from "./dashboardData";
import { useNavigate } from "react-router-dom";

function ProfileField({ label, value, field, editing, form, onChange }) {
    return (
        <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                {label}
            </label>
            {editing ? (
                <input
                    value={form[field] ?? ""}
                    onChange={(e) => onChange(field, e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5
                        text-[14px] text-gray-800 outline-none focus:border-[#00327d] focus:bg-white
                        transition-all duration-150"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                />
            ) : (
                <div className="text-[14px] text-gray-800 font-semibold py-2.5">
                    {value || <span className="text-gray-400 font-normal">Not set</span>}
                </div>
            )}
        </div>
    );
}

export default function AccountView() {
    const { user, profile } = useAuth();
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
        email: profile?.email ?? "",
        phone: profile?.phone ?? "",
    });

    function handleChange(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSave() {
        setSaving(true);
        setError("");
        try {
            await updateDoc(doc(db, "users", user.uid), {
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                // email is managed by Firebase Auth, not editable here
            });
            setEditing(false);
        } catch (err) {
            console.log(err);
            setError("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    async function handleLogout() {
        await logoutUser();
        navigate("/auth");
    }

    const firstName = profile?.firstName ?? "";
    const lastName = profile?.lastName ?? "";

    // Format joined date from Firestore timestamp
    const joined = profile?.joined
        ? new Date(profile.joined.seconds * 1000).toLocaleDateString("en-GB", {
            month: "long", year: "numeric",
        })
        : "—";

    return (
        <div className="flex flex-col gap-5 w-full max-w-lg" style={{ animation: "slideUp .3s ease both" }}>

            {/* Error banner */}
            {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold px-4 py-3 rounded-xl">
                    <Icon name="error" className="text-[16px] shrink-0" />
                    {error}
                </div>
            )}

            {/* Avatar + name */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                <div
                    className="w-14 h-14 rounded-full bg-[#00327d] flex items-center justify-center
                        text-white text-[20px] font-extrabold flex-shrink-0"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {firstName ? initials(firstName, lastName || " ") : "?"}
                </div>
                <div className="min-w-0">
                    <div
                        className="text-[17px] font-extrabold text-gray-900 truncate"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {firstName} {lastName}
                    </div>
                    <div className="text-[12px] text-gray-400">Member since {joined}</div>
                </div>
            </div>

            {/* Profile fields */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3
                        className="text-[14px] font-extrabold text-gray-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Profile details
                    </h3>
                    <button
                        onClick={editing ? handleSave : () => setEditing(true)}
                        disabled={saving}
                        className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-xl
                            transition-all duration-150 border
                            ${editing
                                ? "bg-[#00327d] text-white border-[#00327d]"
                                : "text-[#00327d] border-[#00327d]/20 hover:bg-blue-50"
                            } ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name={editing ? "check" : "edit"} className="text-[14px]" />
                        {saving ? "Saving…" : editing ? "Save" : "Edit"}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ProfileField label="First name" field="firstName" value={form.firstName} editing={editing} form={form} onChange={handleChange} />
                    <ProfileField label="Last name" field="lastName" value={form.lastName} editing={editing} form={form} onChange={handleChange} />
                </div>
                {/* Email is read-only — managed by Firebase Auth */}
                <ProfileField label="Email address" field="email" value={form.email} editing={false} form={form} onChange={handleChange} />
                <ProfileField label="Phone number" field="phone" value={form.phone} editing={editing} form={form} onChange={handleChange} />
            </div>

            {/* Account actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3
                    className="text-[14px] font-extrabold text-gray-900 mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Account
                </h3>
                <div className="flex flex-col gap-2">
                    <button
                        className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-600
                            hover:text-gray-900 transition-colors py-1 text-left"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name="lock" className="text-[16px] text-gray-400" />
                        Change password
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-600
                            hover:text-gray-900 transition-colors py-1 text-left"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name="logout" className="text-[16px] text-gray-400" />
                        Sign out
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                        className="flex items-center gap-2.5 text-[13px] font-semibold text-red-400
                            hover:text-red-600 transition-colors py-1 text-left"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name="delete_forever" className="text-[16px]" />
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
}
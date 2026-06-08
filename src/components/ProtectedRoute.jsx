import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <LoadingScreen />;
    if (!user) return <Navigate to="/auth" replace />;

    return children;
}

export function AdminRoute({ children }) {
    const { user, profile, loading } = useAuth();

    if (loading) return <LoadingScreen />;
    if (!user) return <Navigate to="/auth" replace />;
    if (!profile?.isAdmin) return <Navigate to="/dashboard" replace />;

    return children;
}

export function GuestRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <LoadingScreen />;
    if (user) return <Navigate to="/dashboard" replace />;

    return children;
}

function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-4 border-[#00327d] border-t-transparent animate-spin" />
                <p className="text-[13px] font-semibold text-gray-400"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Loading…
                </p>
            </div>
        </div>
    );
}
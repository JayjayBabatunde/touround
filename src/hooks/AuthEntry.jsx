import { useState } from "react";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";

export default function AuthEntry({ initialView = "login" }) {
    const [view, setView] = useState(initialView);

    if (view === "signup") {
        return <SignupPage onNavigateToLogin={() => setView("login")} />;
    }

    return <LoginPage onNavigateToSignup={() => setView("signup")} />;
}
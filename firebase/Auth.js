import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

// Register
export async function registerUser({ firstName, lastName, email, password, travellerType, newsletter }) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    // Update display name
    await updateProfile(user, { displayName: `${firstName} ${lastName}` });

    // Save extra profile data to Firestore
    await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        travellerType: travellerType || null,
        newsletter,
        isAdmin: false,
        joined: serverTimestamp(),
        phone: "",
    });

    return user;
}

// Login
export async function loginUser(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
}

// Logout
export async function logoutUser() {
    await signOut(auth);
}

// Forgot password
export async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
}

// Get Firestore profile
export async function getUserProfile(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
}
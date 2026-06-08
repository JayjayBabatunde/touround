import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    serverTimestamp,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "./firebase";

// Write a new booking for the logged-in user
export async function createBooking(userId, bookingData) {
    const ref = await addDoc(collection(db, "bookings"), {
        userId,
        ...bookingData,
        status: "confirmed",
        createdAt: serverTimestamp(),
    });
    return ref.id;
}

// Read all bookings for a specific user
export async function getUserBookings(userId) {
    const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Read ALL bookings (admin only)
export async function getAllBookings() {
    const q = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getAllUsers() {
    const q = query(
        collection(db, "users"),
        orderBy("joined", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Update booking status (admin)
export async function updateBookingStatus(bookingId, status) {
    await updateDoc(doc(db, "bookings", bookingId), { status });
}

// Toggle user admin role
export async function updateUserRole(userId, isAdmin) {
    await updateDoc(doc(db, "users", userId), { isAdmin });
}
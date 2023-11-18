import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, updateProfile } from "firebase/auth";
import { app } from "../firebase";
import { doc, setDoc, getDoc, collection, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { format } from 'date-fns';

export const login = async ({ email, password }) => {
  const auth = getAuth(app);
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (res.user && res.user.emailVerified) {
      const userDocRef = doc(db, 'users', res.user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return { ...res.user, ...userData };
      } else {
        throw new Error("User data not found in Firestore.");
      }
    } else {
      throw new Error("Email not verified. Please verify your email before logging in.");
    }
  } catch (error) {
    console.error('Login error:', error.message, error.code);
    throw new Error("Invalid email or password.");
  }
};

export const signOutUser = async () => {
  const auth = getAuth(app);

  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new Error("Unable to sign out.");
  }
};

export const signup = async ({ email, password, role, fullname, company, sites, mobileno }) => {
  const auth = getAuth(app);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(res.user);

    const userDocRef = doc(db, 'users', res.user.uid);
    await setDoc(userDocRef, {
      uid: res.user.uid,
      email: res.user.email,
      role: role || null,
      fullname: fullname || null,
      company: company || null,
      sites: sites || null,
      mobileno: mobileno || null,
    });

    return { ...res.user, role, fullname, company, sites, mobileno };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Unable to fetch users.");
  }
};
export const getTotalPermits = async (userId) => {
  try {
    const permitsCollection = collection(db, "permits");
    const userDocRef = doc(permitsCollection, userId);
    const permitsSubcollection = collection(userDocRef, "data");

    const permitsSnapshot = await getDocs(permitsSubcollection);
    const totalPermits = permitsSnapshot.size;

    console.log("Total permits for user", userId, ":", totalPermits);
    return totalPermits;
  } catch (error) {
    console.error("Error getting total permits:", error.message);
    throw new Error("Unable to get total permits.");
  }
};
// export const storePermit = async (userId, extendedPermitData) => {
//   try {
//     const permitsCollection = collection(db, "permits");
//     const userDocRef = doc(permitsCollection, userId);
//     const permitsSubcollection = collection(userDocRef, "data");

//     const newPermitDocRef = await addDoc(permitsSubcollection, {
//       permitType: extendedPermitData.permitType,
//       site: extendedPermitData.site,
//       startDate: extendedPermitData.startDate,
//       startTime: extendedPermitData.startTime,
//       endDate: extendedPermitData.endDate,
//       endTime: extendedPermitData.endTime,
//       isGeneralChecked: extendedPermitData.isGeneralChecked,
//       buildingNotes: extendedPermitData.buildingNotes,
//       levelNotes: extendedPermitData.levelNotes,
//       selectedLevels: extendedPermitData.selectedLevels,
//       selectedBuildings: extendedPermitData.selectedBuildings,
//       site2: extendedPermitData.site2,
//       userId: extendedPermitData.userId,
//       permitNumber: extendedPermitData.permitNumber,
//       status: extendedPermitData.status,
//       createdAt: extendedPermitData.createdAt,
//     });

//     console.log("Permit data stored with ID:", newPermitDocRef.id);
//     return newPermitDocRef.id;
//   } catch (error) {
//     console.error("Error storing permit data:", error.message);
//     throw new Error("Unable to store permit data.");
//   }
// };
export const storePermit = async (userId, extendedPermitData) => {
  try {
    const permitsCollection = collection(db, "permits");

    // Use a random unique ID for each permit document
    const newPermitDocRef = doc(permitsCollection);

    const newPermitData = {
      userId,
      permitType: extendedPermitData.permitType,
      site: extendedPermitData.site,
      startDate: extendedPermitData.startDate,
      startTime: extendedPermitData.startTime,
      endDate: extendedPermitData.endDate,
      endTime: extendedPermitData.endTime,
      isGeneralChecked: extendedPermitData.isGeneralChecked,
      buildingNotes: extendedPermitData.buildingNotes,
      levelNotes: extendedPermitData.levelNotes,
      selectedLevels: extendedPermitData.selectedLevels,
      selectedBuildings: extendedPermitData.selectedBuildings,
      site2: extendedPermitData.site2,
      permitNumber: extendedPermitData.permitNumber,
      status: extendedPermitData.status,
      createdAt: extendedPermitData.createdAt,
      selectedFile:extendedPermitData.selectedFile,
      drawingFile:extendedPermitData.drawingFile,
    };

    await setDoc(newPermitDocRef, newPermitData);

    console.log("Permit data stored with ID:", newPermitDocRef.id);
    return newPermitDocRef.id;
  } catch (error) {
    console.error("Error storing permit data:", error.message);
    throw new Error("Unable to store permit data.");
  }
};

export const getPermitsByUserId = async (userId) => {
  try {
    const permitsCollection = collection(db, "permits");
    const querySnapshot = await getDocs(
      query(permitsCollection, where("userId", "==", userId))
    );

    const permits = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return permits;
  } catch (error) {
    console.error("Error retrieving permits:", error.message);
    throw new Error("Unable to retrieve permits.");
  }
};


export const getAllPermitsCreatedByAllUsers = async () => {
  try {
    const permitsCollection = collection(db, "permits");
    const querySnapshot = await getDocs(permitsCollection);

    const allPermits = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
console.log("allllllllllllllllllllll",allPermits)
    return allPermits;
  } catch (error) {
    console.error("Error retrieving all permits:", error.message);
    throw new Error("Unable to retrieve all permits.");
  }
};




export const updatePermitStatus = async (permitId, newStatus) => {
  try {
    const permitsCollection = collection(db, "permits");
    const permitDocRef = doc(permitsCollection, permitId);

    const permitDoc = await getDoc(permitDocRef);
    if (!permitDoc.exists()) {
      throw new Error(`Document with ID ${permitId} does not exist.`);
    }

    await updateDoc(permitDocRef, { status: newStatus });

    console.log(`Permit status updated successfully: ${permitId} is now ${newStatus}`);
  } catch (error) {
    console.error("Error updating permit status:", error.message);
    throw new Error("Unable to update permit status.");
  }

};

};





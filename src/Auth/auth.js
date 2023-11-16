import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { app } from "../firebase";
import { doc, setDoc ,getDoc,collection ,getDocs,query, where ,addDoc } from "firebase/firestore";
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
  
  const getPermitsCount = async (db) => {
    try {
      const permitsCollection = collection(db, "permits");
      const permitsSnapshot = await getDocs(permitsCollection);
  
      return permitsSnapshot.size; // Returns the total number of permits
    } catch (error) {
      console.error("Error getting permits count:", error.message);
      throw new Error("Unable to retrieve permits count.");
    }
  };
  export const signup = async ({ email, password, role = 'employee', fullname, company, sites, mobileno }) => {
    const auth = getAuth(app);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      await sendEmailVerification(res.user);
  
      const userDocRef = doc(db, 'users', res.user.uid);
      await setDoc(userDocRef, {
        uid: res.user.uid,
        email: res.user.email,
        role,
        fullname: fullname || null,
        company: company || null,
        sites: sites || null,
        mobileno: mobileno || null,
        // Add other user information as needed
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
  export const storePermit = async (userId, extendedPermitData) => {
    try {
      const permitsCollection = collection(db, "permits");
      const userDocRef = doc(permitsCollection, userId);
      const permitsSubcollection = collection(userDocRef, "data");
  
      const newPermitDocRef = await addDoc(permitsSubcollection, {
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
        userId:extendedPermitData.userId,
        permitNumber:extendedPermitData.permitNumber,
        status:extendedPermitData.status,
         createdAt: extendedPermitData.createdAt,
      });
  
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
    const userDocRef = doc(permitsCollection, userId);
    const permitsSubcollection = collection(userDocRef, "data");

    const querySnapshot = await getDocs(permitsSubcollection);

    const permits = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return permits;
  } catch (error) {
    console.error("Error retrieving permits:", error.message);
    throw new Error("Unable to retrieve permits.");
  }
};


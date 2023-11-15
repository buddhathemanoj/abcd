import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { app } from "../firebase";
import { doc, setDoc ,getDoc,collection ,getDocs} from "firebase/firestore";
import { db } from "../firebase";


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
  
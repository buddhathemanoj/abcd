import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, updateProfile ,getUserByEmail, signInWithPhoneNumber} from "firebase/auth";
import { app } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc,Timestamp, setDoc, getDoc, collection, getDocs, query, where, addDoc, updateDoc,getFirestore } from "firebase/firestore";
import { db ,storage} from "../firebase";
import emailjs from 'emailjs-com';
import { useRecaptchaVerifier } from 'react-firebase-hooks/auth';
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




const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const storeOTPInDB = async (userId, otp) => {
  const otpDocRef = doc(db, 'otps', userId);
  const timestamp = Timestamp.fromDate(new Date());

  try {
    await setDoc(otpDocRef, { otp, timestamp });
  } catch (error) {
    console.error('Store OTP error:', error.message);
    throw new Error("Failed to store OTP.");
  }
};


export const sendOTPEmail = async (email, otp) => {
  const templateParams = {
    to_email: email,
    otp: otp,
  };

  try {
    const result = await emailjs.send('service_09oj4um', 'template_fsuitfu', templateParams, '_v00BxitQJfaTPJuQ');
    console.log('OTP sent successfully:', result.text);
    return result;
  } catch (error) {
    console.error('Error sending OTP:', error.text);
    throw new Error('Failed to send OTP.');
  }
};




export const loginAndSendOTP = async ({ email, password }) => {
  console.log(email);
  const auth = getAuth(app);

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (res.user) {
      if (res.user.emailVerified) {
        const otp = generateOTP();
        await storeOTPInDB(res.user.uid, otp);

        await sendOTPEmail(email, otp);


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
    } else {
      throw new Error("User not found or authentication failed.");
    }
  } catch (error) {
    console.error('Login error:', error.message, error.code);
    throw new Error("Invalid email or password."); // Adjust the error message based on specific error conditions
  }
};

export const verifyOTP = async (userId, enteredOTP) => {
  try {
    console.log('verify tp',userId,enteredOTP)
    const userDocRef = doc(db, 'otps', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const storedOTP = userData.otp;
console.log('stored otp',storedOTP)
      if (enteredOTP === storedOTP) {
        
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error('User data not found in Firestore.');
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    throw new Error('Failed to verify OTP.');
  }
};

// export const getUserDetailsByEmail = async (email) => {
//   const auth = getAuth();
  
//   try {
//     // Get user by email from Firebase Authentication
//     const userRecord = await getUserByEmail(auth, email);

//     if (userRecord) {
//       const userUid = userRecord.uid;

//       // Fetch user details from Firestore using the obtained UID
//       const userDocRef = db.collection('users').doc(userUid);
//       const userDoc = await userDocRef.get();

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         return { uid: userUid, ...userData };
//       } else {
//         throw new Error('User data not found in Firestore.');
//       }
//     } else {
//       throw new Error('User not found.');
//     }
//   } catch (error) {
//     console.error('Error fetching user details:', error.message);
//     throw new Error('Unable to fetch user details.');
//   }
// };
export const getUserDetailsByEmail = async (email) => {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection.where('email', '==', email));

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      throw new Error('User not found for email: ' + email);
    }
  } catch (error) {
    console.error('Error fetching user details by email:', error);
    throw new Error('Unable to fetch user details.');
  }
};


// ... Firebase initialization and other imports

export const sendEmailVerificationCode = async (email, password) => {
  try {
    const auth = getAuth();
    const db = getFirestore();

    console.log("Signing in user...");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Checking user in the 'users' collection...");
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 10); // 10 minutes expiration time

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        verificationCode,
        verificationCodeExpiration: expirationTime,
      });

      // Send email verification to the user
      await user.sendEmailVerification();

      console.log(`Verification code for ${email} sent.`);
      return verificationCode;
    } else {
      console.error("User not found. Please check your email or register an account.");
      throw new Error("User not found. Please check your email or register an account.");
    }
  } catch (error) {
    console.error("Error sending email verification code:", error.message);
    throw new Error("Unable to send verification code.");
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
export const getTotalllPermits = async () => {
  try {
    const permitsCollection = collection(db, "permits");
    const querySnapshot = await getDocs(permitsCollection);

    const permits = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return permits;
  } catch (error) {
    console.error("Error retrieving permits:", error.message);
    throw new Error("Unable to retrieve permits.");
  }
};
// export const storePermit = async (userId, extendedPermitData) => {
//   try {
//     const permitsCollection = collection(db, "permits");

//     // Use a random unique ID for each permit document
//     const newPermitDocRef = doc(permitsCollection);

//     const newPermitData = {
//       userId,
//       permitType: extendedPermitData.permitType,
//       site: extendedPermitData.site,
//       decDate: extendedPermitData.decDate,
//       contractCompany: extendedPermitData.contractCompany,
//       supervisor: extendedPermitData.supervisor,
//       workdesc: extendedPermitData.workdesc,
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
//       permitNumber: extendedPermitData.permitNumber,
//       status: extendedPermitData.status,
//       createdAt: extendedPermitData.createdAt,
//       selectedFile:extendedPermitData.selectedFile,
//       drawingFile:extendedPermitData.drawingFile,
//       signFile:extendedPermitData.signFile,
//       riskfile:extendedPermitData.riskfile,
//     };

//     await setDoc(newPermitDocRef, newPermitData);

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

    const newPermitDocRef = doc(permitsCollection);

    const uploadPromises = [];
    const getFileDownloadUrl = async (file) => {
      const storageRef = ref(storage, `path/to/upload/${file.name}`);
    
      const contentType = file.type;
    
      const metadata = {
        contentType,
      };
    
      await uploadBytes(storageRef, file, metadata);
      return getDownloadURL(storageRef);
    };
    

    if (extendedPermitData.selectedFile) {
      uploadPromises.push(getFileDownloadUrl(extendedPermitData.selectedFile));
    }

    if (extendedPermitData.drawingFile) {
      uploadPromises.push(getFileDownloadUrl(extendedPermitData.drawingFile));
    }

    if (extendedPermitData.signFile) {
      uploadPromises.push(getFileDownloadUrl(extendedPermitData.signFile));
    }

    if (extendedPermitData.riskfile) {
      uploadPromises.push(getFileDownloadUrl(extendedPermitData.riskfile));
    }

    const [selectedFileUrl, drawingFileUrl, signFileUrl, riskFileUrl] = await Promise.all(uploadPromises);

    const newPermitData = {
      userId,
      permitType: extendedPermitData.permitType,
      site: extendedPermitData.site,
      decDate: extendedPermitData.decDate,
      contractCompany: extendedPermitData.contractCompany,
      supervisor: extendedPermitData.supervisor,
      workdesc: extendedPermitData.workdesc,
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
      selectedFile: selectedFileUrl ? { ...extendedPermitData.selectedFile, url: selectedFileUrl } : null,
      drawingFile: drawingFileUrl ? { ...extendedPermitData.drawingFile, url: drawingFileUrl } : null,
      signFile: signFileUrl ? { ...extendedPermitData.signFile, url: signFileUrl } : null,
      riskfile: riskFileUrl ? { ...extendedPermitData.riskfile, url: riskFileUrl } : null,
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
export const updateProfileData = async (userId, editProfileData) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      fullname: editProfileData.fullname || null,
      email: editProfileData.email || null,
      phonenumber: editProfileData.phonenumber || null,
      
    });

    console.log('Profile data updated successfully for user:', userId);
  } catch (error) {
    console.error('Error updating profile data:', error.message);
    throw new Error('Unable to update profile data.');
  }
};


export const storeSiteData = async (siteData) => {
  try {
    // Assuming 'sites' is the collection in Firestore where you want to store site data
    const sitesCollection = collection(db, 'sites');

    // Add the new site data to the 'sites' collection
    const newSiteDocRef = await addDoc(sitesCollection, siteData);

    // Log the submitted data before returning the document ID
    console.log('Submitted Site Data:', siteData);

    console.log('Site data stored with ID:', newSiteDocRef.id);
    return newSiteDocRef.id;
  } catch (error) {
    console.error('Error storing site data:', error.message);
    throw new Error('Unable to store site data.');
  }
};



















// export const sendPhoneVerificationCode = async (phoneNumber) => {
//   try {
//     const auth = getAuth(); // Ensure getAuth is properly initialized
//     const db = getFirestore(); // Ensure getFirestore is properly initialized

//     console.log("Sending verification code to the phone number...");

//     const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const expirationTime = new Date();
//     expirationTime.setMinutes(expirationTime.getMinutes() + 10); // 10 minutes expiration time

//     const userDocRef = doc(db, 'users', auth.currentUser.uid);
//     await updateDoc(userDocRef, {
//       verificationCode,
//       verificationCodeExpiration: expirationTime,
//       phoneNumber,
//     });

//     // Assume signInWithPhoneNumber is a valid Firebase method for sending the verification code
//     // Make sure Firebase supports this method and it's correctly configured in your project
//     await signInWithPhoneNumber(auth, phoneNumber);

//     console.log(`Verification code for ${phoneNumber} sent.`);
//     return verificationCode;
//   } catch (error) {
//     console.error("Error sending phone verification code:", error.message);
//     throw new Error("Unable to send verification code.");
//   }
// };

// export const verifyPhoneVerificationCode = async (verificationCode, phoneNumber) => {
//   const auth = getAuth(app);
//   const db = getFirestore(app);

//   try {
//     console.log("Verifying phone number...");

//     // Verify the provided verification code against the saved code in Firestore
//     const userDocRef = doc(db, 'users', auth.currentUser.uid);
//     const userDocSnapshot = await getDoc(userDocRef);

//     if (userDocSnapshot.exists()) {
//       const userData = userDocSnapshot.data();
//       const savedVerificationCode = userData.verificationCode;
//       const savedPhoneNumber = userData.phoneNumber;

//       if (phoneNumber === savedPhoneNumber && verificationCode === savedVerificationCode) {
//         console.log('Phone number verified successfully!');
//         // Perform further actions after phone number verification
//       } else {
//         console.error('Invalid verification code or phone number.');
//         throw new Error('Invalid verification code or phone number.');
//       }
//     } else {
//       console.error('User document not found.');
//       throw new Error('User document not found.');
//     }
//   } catch (error) {
//     console.error('Error verifying phone number:', error.message);
//     throw new Error('Unable to verify phone number.');
//   }
// };
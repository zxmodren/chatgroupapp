
import db from '../db/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import md5 from 'crypto-js/md5';

const createUserProfile = userProfile =>
    db
        .collection('profiles')
        .doc(userProfile.uid)
        .set(userProfile)


export const getUserProfile = uid =>
    db
        .collection('profiles')
        .doc(uid)
        .get()
        .then(snapshot => snapshot.data())

export async function register({ email, password }) {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const username = email.split('@')[0]; // Mengambil nama depan dari email
        const hash = md5(email.trim().toLowerCase()); // Menghitung hash dari email
        const avatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`; // Avatar Gravatar identicon
        const userProfile = { uid: user.uid, username, email, avatar, joinedChats: [] };
        await createUserProfile(userProfile);
        return userProfile;
}


export const Login = async ({ email, password }) => {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const userProfile = await getUserProfile(user.uid);
    return userProfile;
}

export const Logout = () => firebase.auth().signOut()

export const onAuthStateChanges = onAuth =>
    firebase.auth().onAuthStateChanged(onAuth)
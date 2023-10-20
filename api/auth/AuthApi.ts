import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import { DeleteAccountPayload } from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// functions
const region = getFirebaseRegion();
const deleteAccount = firebase.app().functions(region).httpsCallable('deleteAccount');
const requestAccessCode = firebase.app().functions(region).httpsCallable('requestAccessCode');
const loginWithAccessCode = firebase.app().functions(region).httpsCallable('loginWithAccessCode');

export default class AuthApi {
  observeAuthState(handler: (a: FirebaseAuthTypes.User | null) => unknown) {
    return auth().onAuthStateChanged(handler);
  }

  // login with phone
  async signInWithPhoneNumber(number: string, countryCode = '55') {
    const phone = `+${countryCode}${number}`;
    return auth().signInWithPhoneNumber(phone);
  }

  async confirmPhoneSignIn(verificationId: string, verificationCode: string) {
    const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    const currentUser = auth().currentUser;
    if (currentUser) {
      if (this.getPhoneNumber()) await currentUser.unlink('phone');
      await currentUser.linkWithCredential(credential);
    }
  }

  getCurrentUser() {
    return auth().currentUser;
  }

  getUserId() {
    const id = this.getCurrentUser()?.uid;
    return id;
  }

  getEmail() {
    return this.getCurrentUser()?.email;
  }

  getPhoneNumber(stripCountryCode = false) {
    const phone = this.getCurrentUser()?.phoneNumber;
    if (!phone || !stripCountryCode || phone.indexOf('+') !== 0) return phone;
    return phone.slice(3);
  }

  signOut() {
    return auth().signOut();
  }

  // firebase functions
  async requestAccessCode(phone: string) {
    return requestAccessCode({
      phone,
      meta: { version: getAppVersion() },
    });
  }
  async loginWithAccessCode(phone: string, accessCode: string) {
    const response = await loginWithAccessCode({
      phone,
      accessCode,
      meta: { version: getAppVersion() },
    });
    return response.data as string;
  }
  signInWithCustomToken(token: string) {
    return auth().signInWithCustomToken(token);
  }
  deleteAccount(payload: Partial<DeleteAccountPayload>) {
    return deleteAccount({
      ...payload,
      meta: { version: getAppVersion() },
    });
  }
}

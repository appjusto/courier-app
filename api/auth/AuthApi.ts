import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { getAppVersion } from '@/common/version';
import { DeleteAccountPayload } from '@appjusto/types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getLoginsCollection } from '../firebase/refs/firestore';
import { getDeleteAccount } from '../firebase/refs/functions';

export default class AuthApi {
  observeAuthState(handler: (a: FirebaseAuthTypes.User | null) => unknown) {
    return auth().onAuthStateChanged(handler);
  }

  // login with phone
  async signInWithPhoneNumber(number: string, countryCode = '55') {
    const phone = `+${countryCode}${number}`;
    try {
      await getLoginsCollection().add({
        phone,
        flavor: 'courier',
        signInAt: serverTimestamp(),
      });
    } catch (error) {
      // Sentry.Native.captureException(error);
    }
    return auth().signInWithPhoneNumber(phone);
  }

  async confirmPhoneSignIn(verificationId: string, verificationCode: string) {
    const credential = auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
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
    return this.getCurrentUser()?.uid;
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
  deleteAccount(payload: Partial<DeleteAccountPayload>) {
    return getDeleteAccount()({
      ...payload,
      meta: { version: getAppVersion() },
    });
  }
}

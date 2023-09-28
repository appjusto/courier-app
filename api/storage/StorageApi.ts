import storage from '@react-native-firebase/storage';

export default class StorageApi {
  async getDownloadURL(path: string) {
    return storage().ref(path).getDownloadURL();
  }
  async putFile(remotePath: string, localPath: string) {
    return new Promise<void>(async (resolve, reject) => {
      const task = storage().ref(remotePath).putFile(localPath);
      task.then(() => {
        resolve();
      });
    });
  }
}

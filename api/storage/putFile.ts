import storage from '@react-native-firebase/storage';

export const putFile = async (localPath: string, remotePath: string) => {
  return new Promise<void>(async (resolve, reject) => {
    const task = storage().ref(remotePath).putFile(localPath);
    task.then(() => {
      resolve();
    });
  });
};

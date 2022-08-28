import app from './firebase';

import { getAuth, signInAnonymously} from "firebase/auth";

export const authenticateAnonymously = () => {
    return signInAnonymously(getAuth(app));
};
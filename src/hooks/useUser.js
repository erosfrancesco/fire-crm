import create from 'zustand';
import { authenticateAnonymously } from '../services/auth';

export const useUser = create(set => ({
    // state
    user: null,
    userId: null,
    error: null,

    // set
    setUser: user => set({ user }),
    setUserId: userId => set({ userId }),

    // logic
    login: () => {
        set({ error: null });
        
        return authenticateAnonymously()
            .then(userCredential => {
                const userId = userCredential.user.uid;
                set({ userId });
            })
            .catch(() => set({ error: 'anonymous-auth-failed' }));
    }
}));

export default useUser;

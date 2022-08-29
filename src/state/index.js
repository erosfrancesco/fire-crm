import create from 'zustand';
import { getJokeReq } from './norris.api';
import axios from "axios";

export const getJokeReq = () => {
    const controller = new AbortController();
    const { signal, abort } = controller;

    const request = axios.get('https://api.chucknorris.io/jokes/random', { signal }).then(r => r.data);

    return { request, abort };
}

export const useNorrisJokes = create(set => ({
    joke: null,
    fetchJoke: () => {
        const { request, abort } = getJokeReq();
        request.then(joke => {
            // console.log('Hello joke', joke)
            set({ joke })
        });

        return abort;
    }
}));

/**
  const fetchJoke = useNorrisJokes(({fetchJoke}) => fetchJoke);

	useEffect(() => {
		// with abort
		return fetchJoke()
		// eslint-disable-next-line
	}, []);
 */
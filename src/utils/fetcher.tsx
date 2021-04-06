// fetcher for 3rd party API calls
const fetcher = (url: string): any => fetch(url).then((res) => res.json());

export default fetcher;

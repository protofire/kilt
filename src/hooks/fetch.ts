
export default function useFetch () {
  const appFetch = (url: string, opts?: any) => {
    if (url.startsWith('/')) return fetch('http://localhost:8000' + url, opts)
    else return fetch(url, opts);
  }
  return {
    appFetch
  }
}


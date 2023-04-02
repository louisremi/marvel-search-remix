import ky from 'ky-universal';

const prefixUrl = 'https://gateway.marvel.com/v1/public';
// No need to provide a hash when executing the request server-side
// as long as we provide a white-listed Referer
const headers = {
  Accept: 'application/json',
  Referer: 'https://developer.marvel.com/',
};
export const publicKey = '531177aecb09ebd5b3555159655e7e24';
export const privateKey = 'a7d9720f2cdf23be57424a759d33efc7a9bd4c31';

export const marvelApi = ky.create({
  prefixUrl,
  headers,
  hooks: {
    beforeRequest: [
      (originalRequest) => {
        const request = new Request({
          ...originalRequest,
          headers: originalRequest.headers,
          // Add API key to the url
          url: `${originalRequest.url}${
            originalRequest.url.includes('?') ? '&' : '?'
          }apikey=${publicKey}`,
        });

        return request;
      },
    ],
  },
});

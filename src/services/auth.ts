//mimicking the request's response
interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

//Simulates an API request
export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: '53gdfhfg42132fasdfasd',
        user: {
          name: 'Mateus',
          email: 'mateusgaldino@hotmail.com',
        },
      });
    }, 1000);
  });
}

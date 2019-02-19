import auth0 from 'auth0-js'
import { history } from './history'

const makeRetrieveClient = () => {
    let client

    return () => {
        if (!client) {
            client = new auth0.WebAuth({
                domain: 'alkanani.eu.auth0.com',
                clientID: '5VaE3Bt7Q9gRZ6fFx6J1A4e0Su4NCdp3',
                redirectUri: 'http://localhost:3000/callback',
                responseType: 'token id_token',
                scope: 'openid'
            })
        }

        return client
    }
}

const retreiveClient = makeRetrieveClient()

export const login = () => {
    const client = retreiveClient()
    client.authorize()
}

export const getAccessToke = () => accessToken

export const getIdToken = () => idToken

export const handleAuthentication = () => {
    const client = retreiveClient()
    
    client.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
          } else if (err) {
            history.replace('/home');
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
          }
    })
}
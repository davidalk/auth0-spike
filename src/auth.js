import auth0 from 'auth0-js'

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

const login = () => {
    const client = retreiveClient()
    client.authorize()
}

export { login }
import auth0 from 'auth0-js'
import { history } from './history'

let accessToken = null
let idToken = null
let expiresAt = 0
const home = '/'

const makeRetrieveClient = () => {
    let client

    return () => {
        if (!client) {
            client = new auth0.WebAuth({
                domain: 'alkanani.eu.auth0.com',
                clientID: '5VaE3Bt7Q9gRZ6fFx6J1A4e0Su4NCdp3',
                redirectUri: 'http://localhost:3000/',
                responseType: 'token id_token',
                scope: 'openid'
            })
        }

        return client
    }
}

const retreiveClient = makeRetrieveClient()

const setSession = (authResult) => {
    localStorage.setItem('isLoggedIn', 'true')

    expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
    accessToken = authResult.accessToken
    idToken = authResult.idToken

    // navigate to the home route
    history.replace(home)
}

export const handleAuthentication = () => {
    const client = retreiveClient()

    return new Promise((resolve, reject) => {
        client.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult)
                resolve()
            } else if (err) {
                history.replace(home)
                console.error(err)
                reject(err)
            }
        })
    })

}

export const renewSession = () => {
    const client = retreiveClient()

    return new Promise((resolve, reject) => {
        client.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult)
                resolve()
            } else if (err) {
                logout()
                console.error(`Could not get a new token (${err.error}: ${err.error_description}).`)
                console.error(err)
                reject(err)
            }
        })
    })
}

export const login = () => {
    const client = retreiveClient()
    client.authorize()
}

export const logout = () => {
    accessToken = null
    idToken = null
    expiresAt = 0

    localStorage.removeItem('isLoggedIn')

    history.replace(home)
}

export const isAuthenticated = () => {
    return new Date().getTime() < expiresAt
}

export const getAccessToke = () => accessToken

export const getIdToken = () => idToken

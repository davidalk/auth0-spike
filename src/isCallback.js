export const isCallback = () => {
    const hash = window.location.hash
    return (/access_token|id_token|error/.test(hash))
  }
export const authHeaders = ( token ) => {
    return {
        "Content-type": "application/json",
        Authorization: `Bearer ${ token }`
    }
}
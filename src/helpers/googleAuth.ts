const getGoogleAuthURL = (redirect_uri: string) => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    }

    const qs = new URLSearchParams(options)

    return `${rootURL}?${qs.toString()}`;
}

export default getGoogleAuthURL;
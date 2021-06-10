import React from 'react';
import ReactDOM from 'react-dom';

import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response: any) => {
    console.log(response);
}

function googleLogin() {
    return (
        <GoogleLogin
            clientId="700723661373-kv9g5sqbijjgnt6qjaa7k90nfiau8b7k.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default googleLogin;


import { getSession } from 'next-auth/client'
// Just checking if there is a next Auth session associated with request
// Also checking to see if the requested content is accessible for a user
export default function withAuth(gssp , role) {
    return async (context) => {
        const {req, res} = context;
        const session = await getSession({req});
        let redirectObject = null;
        // When a request does not have a session, redirect them to login
        if (!session) {
            redirectObject = doRedirect(res, 302, '/login');
            return redirectObject;
        }
        // When a request does not have the authorization, let them go back to dashboard (their logged in main page)
        if (typeof role !== 'undefined' && session.user.role !== role) {
            redirectObject = doRedirect(res, 302, '/dashboard');
            return redirectObject;
        }
        // If pass session check and role check let the wrapped getServerSideProps function go ahead with its work
        return await gssp(context);
    }
}

function doRedirect(res, _statusCode, _destination) {
    res.statusCode = _statusCode;
    res.setHeader('Location', _destination);
    // Must return something to suppress warning
    return {
        redirect: {
            destination: _destination,
            statusCode: _statusCode
        }
    };
}
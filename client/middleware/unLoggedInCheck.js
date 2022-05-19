export default function ({ store, redirect, $auth }) {
    const isAuthenticated = $auth.loggedIn;
    if (isAuthenticated) {
        redirect('/dashboard');
    }
};

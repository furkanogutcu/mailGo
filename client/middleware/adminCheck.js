export default function ({ store, redirect, $auth }) {
    const isAuthenticated = $auth.loggedIn;
    if (isAuthenticated) {
        const subscriber = store.getters.getSubscriber;
        if (!subscriber.roles.some(role => role.name.toLowerCase() === 'admin')) {
            redirect('/');
        }
    }
};

export default function ({ route, app, store, redirect }) {
    const verify = route.path.split("/")
    const isLoggedIn = store.$auth.$state.loggedIn;
    const isAuthRoute = ['/login', '/sign-up', '/forgot-password'].includes(route.path);
    const isVerifyRoute = verify.includes('/verify');

    if (!isLoggedIn && (isVerifyRoute || !isAuthRoute)) {
        console.log("2");

        return redirect("/login");
    }
    if (isLoggedIn && route.path == '/') {
        console.log("1");
        return redirect('/dashboard')
    }
}

export default function ({ route, app, store, redirect }) {
    const verify = route.path.split("/")
    const isLoggedIn = store.$auth.$state.loggedIn;
    const isAuthRoute = ['/login', '/sign-up', '/forgot-password'].includes(route.path);
    const isVerifyRoute = verify.includes('/verify');
    console.log(route.path == '/2fa');
    if (route.path == '/2fa') {
        return
    }
    if (!isLoggedIn && (isVerifyRoute || !isAuthRoute)) {
        console.log("111");
        return redirect("/login");
    }
    if (isLoggedIn && route.path == '/') {
        return redirect('/dashboard')
    }
}

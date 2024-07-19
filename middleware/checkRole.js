export default function ({ route, app, store, redirect }) {
    const verify = route.path.split("/")
    if (!store.$auth.$state.loggedIn && !['/login', '/sign-up', '/forgot-password'].includes(route.path) && verify.includes('/verify')) {
        return redirect("/login")
    }
}

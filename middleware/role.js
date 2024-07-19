export default function ({ store, redirect, $auth, route }) {
  const userRole = store?.state?.auth?.user?.data?.role;
  const adminDashboard = "/admin/dashboard";
  const userDashboard = "/dashboard";

  // Prevent redirection if the user is already on the target page
  if (userRole === 1) {
    return redirect(adminDashboard);
  } else {
    return redirect(userDashboard);
  }
}

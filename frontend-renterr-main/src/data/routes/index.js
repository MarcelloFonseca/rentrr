import Home from "views/dashboard/home";
import Signup from "views/onboarding/signup";
import Login from "views/onboarding/login";
import IssueTracking from "views/dashboard/issue-tracking";
import LandlordProfile from "views/dashboard/landlord-profile";
import TenantProfile from "views/dashboard/tenant-profile";
import TenantRequest from "views/dashboard/tenant-request";

export const routes = [
    {
        path: "/",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/tenant-dashboard",
        element: <Home type={"tenant"} />
    },
    {
        path: "/landlord-dashboard",
        element: <Home type={"landlord"} />
    },
    {
        path: "/maintenance-issue-tracking",
        element: <IssueTracking />
    },
    {
        path: "/landlord-profile",
        element: <LandlordProfile />
    },
    {
        path: "/tenant-profile",
        element: <TenantProfile />
    },
    {
        path: "/tenant-request",
        element: <TenantRequest />
    },
]
import toast from "react-hot-toast";

export const base_url = "https://1h0pkps9-3300.inc1.devtunnels.ms/";

export const getDataFromLocalStorage = (key = "userData") => {
    const data = JSON.parse(localStorage.getItem(key))?.data;
    if (!data) {
        window.location.href = '/login';
        return null;
    }
    return data;
}

export const userSignup = (data) => {
    return fetch(base_url + "api/auth/signup", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    const error = new Error("HTTP error");
                    error.data = errorData;
                    throw error;
                });
            }
            return resp.json();
        })
        .catch(err => {
            console.log(err);
            toast.error(err?.data?.message || "Something went wrong!");
            throw err;
        });
}

export const userLogin = (data) => {
    return fetch(base_url + "api/auth/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    const error = new Error("HTTP error");
                    error.data = errorData;
                    throw error;
                });
            }
            return resp.json();
        })
        .catch(err => {
            console.log(err);
            toast.error(err?.data?.message || "Something went wrong!");
            throw err;
        });
}

export const setUserAccountType = (data) => {
    return fetch(base_url + "api/auth/role/" + data.id, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data)
    })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    const error = new Error("HTTP error");
                    error.data = errorData;
                    throw error;
                });
            }
            return resp.json();
        })
        .catch(err => {
            console.log(err);
            toast.error(err?.data?.message || "Something went wrong!");
            throw err;
        });
}

export const addProperty = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getDataFromLocalStorage()?.token}`);

    return fetch(base_url + "api/addproperty/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
    })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    const error = new Error("HTTP error");
                    error.data = errorData;
                    throw error;
                });
            }
            return resp.json();
        })
        .catch(err => {
            console.log(err);
            toast.error(err?.data?.message || "Something went wrong!");
            throw err;
        });
}

export const linkProperty = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getDataFromLocalStorage()?.token}`);

    return fetch(base_url + "api/linkproperty/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
    })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    const error = new Error("HTTP error");
                    error.data = errorData;
                    throw error;
                });
            }
            return resp.json();
        })
        .catch(err => {
            console.log(err);
            toast.error(err?.data?.message || "Something went wrong!");
            throw err;
        });
}

export const getMaintenanceRequest = async ({ type }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getDataFromLocalStorage()?.token}`);

    const resp = await fetch(base_url + `${type == "landlord" ? "api/maintenance/" : "api/tenantmaintenance/"}`, {
        method: "GET",
        headers: myHeaders,
    });
    const data = await resp.json();
    return data;
};

// export const sendMaintenanceRequest = (data) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${getDataFromLocalStorage()?.token}`);

//     return fetch(base_url + "api/maintenance/", {
//         method: "POST",
//         headers: myHeaders,
//         body: JSON.stringify(data)
//     })
//         .then(resp => {
//             if (!resp.ok) {
//                 return resp.json().then(errorData => {
//                     const error = new Error("HTTP error");
//                     error.data = errorData;
//                     throw error;
//                 });
//             }
//             return resp.json();
//         })
//         .catch(err => {
//             console.log(err);
//             toast.error(err?.data?.message || "Something went wrong!");
//             throw err;
//         });
// }

export const sendMaintenanceRequest = (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getDataFromLocalStorage()?.token}`);

    return fetch(base_url + "api/maintenance/", {
        method: "POST",
        headers: myHeaders,
        body: formData
    })
        .then(resp => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    const error = new Error("HTTP error");
                    error.data = errorData;
                    throw error;
                });
            }
            return resp.json();
        })
        .catch(err => {
            console.log(err);
            toast.error(err?.data?.message || "Something went wrong!");
            throw err;
        });
}

const BASE_URL = 'http://localhost:8080';
const RESOURSE_URL = `${BASE_URL}/notebook`

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (body) {
        reqParams.body = JSON.stringify(body);
    }
    return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
    console.error("ERROR: ", error);
    }
};

export const getStationeryById = async (id) => {
    const rawResponse = await baseRequest({ urlPath: `/${id}`, method: "GET" });
    return await rawResponse.json();
};

export const getAllStationeries = async () => {
    const rawResponse = await baseRequest({ method: "GET" });
    return await rawResponse.json();
};

export const postStationery = (body) => baseRequest({ method: "POST", body });

export const updateStationery = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteStationery = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });
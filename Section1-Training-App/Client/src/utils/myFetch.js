export const myFetch = async (endpoint, options = {}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw Error(data.message || "Something went wrong!");
  }

  return data;
};

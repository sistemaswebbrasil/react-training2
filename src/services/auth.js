import api from "./api";

export const TOKEN_KEY = "_training_user_key_";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || "";
};

export const login = token => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const validateToken = async () => {
  try {
    const { data } = await api.get("profile");
    return data;
  } catch (e) {
    throw Error(e);
  }
};

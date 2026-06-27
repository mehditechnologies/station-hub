import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { API_BASE } from "./config";

let isHandlingLogout = false;

async function handleUnauthorized() {
  if (isHandlingLogout) return; // avoid double-redirects if multiple calls 401 at once
  isHandlingLogout = true;
  await AsyncStorage.removeItem("token");
  router.replace("/login"); // adjust path to match your actual login route
  isHandlingLogout = false;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await AsyncStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    await handleUnauthorized();
  }

  return res;
}
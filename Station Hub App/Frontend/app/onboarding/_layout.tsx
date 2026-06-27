import { Stack } from "expo-router";
import { useAuthGate } from "../../src/useAuthGate";

export default function Layout() {
  useAuthGate();

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
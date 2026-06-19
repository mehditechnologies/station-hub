import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Bottomnav from "@/components/Bottomnav";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../../../src/config"; // adjust relative path as needed

type Station = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  image_url?: string;
};

export default function BookingScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    service_id?: string;
    tier?: string;
    name?: string;
    price?: string;
    duration?: string;
    image_url?: string;
    station_ids?: string;
  }>();

  const hasSelectedService = !!params.service_id;
  console.log("station_ids param:", params.station_ids);

  const [selectedDate, setSelectedDate] = useState("11");
  const [selectedTime, setSelectedTime] = useState("12:00 PM");
  const [vehicleType, setVehicleType] = useState("Car");

  // ── Stations linked to this service ─────────────────────
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null,
  );
  const [loadingStations, setLoadingStations] = useState(false);
  const [stationsError, setStationsError] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      if (!params.station_ids) return;

      let ids: string[] = [];
      try {
        ids = JSON.parse(params.station_ids);
      } catch {
        ids = [];
      }
      console.log("parsed ids:", ids);
      if (!ids.length) return;

      setLoadingStations(true);
      setStationsError("");
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("token:", token);
        if (!token) {
          setStationsError("Please log in to see available stations");
          return;
        }

        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await fetch(`${API_BASE}/stations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              console.log("station fetch status:", id, res.status);
              if (!res.ok) return null;
              const data = await res.json();
              console.log("station data:", data);
              return data.station as Station;
            } catch (err) {
              console.log("station fetch error:", id, err);
              return null;
            }
          }),
        );

        const valid = results.filter(Boolean) as Station[];
        console.log("valid stations:", valid);
        setStations(valid);
        if (valid.length > 0) setSelectedStationId(valid[0].id);
      } catch (e) {
        console.log("outer fetch error:", e);
        setStationsError("Failed to load stations");
      } finally {
        setLoadingStations(false);
      }
    };

    fetchStations();
  }, [params.station_ids]);

  const dates = [
    { day: "Sun", num: "02" },
    { day: "Mon", num: "03" },
    { day: "Tue", num: "04" },
    { day: "Wed", num: "11" },
    { day: "Thu", num: "12" },
    { day: "Fri", num: "13" },
  ];

  const times = ["10:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];

  return (
    <LinearGradient
      colors={["#fffdfb", "#fff6f0", "#ffe8d8"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {!hasSelectedService ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#FF7A00" />
            <Text style={styles.emptyTitle}>No service selected</Text>
            <Text style={styles.emptySubtitle}>
              Go to the Services page and select a service to book.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push("/(tabs)/service/base")}
            >
              <Text style={styles.emptyBtnText}>Browse Services</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Book Your Wash</Text>

              <Image
                source={require("../../../assets/images/johndoe.png")}
                style={styles.profileImage}
              />
            </View>

            {/* SERVICE CARD */}
            <View style={styles.card}>
            <Text style={styles.eyebrow}>Selected Service</Text>

              {params.image_url ? (
                <Image
                  source={{ uri: params.image_url }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/riverside.png")}
                  style={styles.image}
                />
              )}

              <Text style={styles.shopName}>{params.name}</Text>

              {params.tier ? (
                <View style={styles.tierBadge}>
                  <Text style={styles.tierBadgeText}>{params.tier}</Text>
                </View>
              ) : null}

              <View style={styles.serviceInfoRow}>
                {params.price ? (
                  <Text style={styles.servicePrice}>
                    PKR {Number(params.price).toLocaleString()}
                  </Text>
                ) : null}

                {params.duration ? (
                  <View style={styles.serviceInfoItem}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.serviceInfoText}>
                      {params.duration}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            {/* STATIONS */}
            <Text style={styles.sectionTitle}>Select Station</Text>

            {loadingStations && (
              <View style={{ paddingVertical: 16, alignItems: "center" }}>
                <ActivityIndicator color="#FF8C42" />
              </View>
            )}

            {!loadingStations && stationsError ? (
              <Text style={styles.stationError}>{stationsError}</Text>
            ) : null}

            {!loadingStations && !stationsError && stations.length === 0 && (
              <Text style={styles.stationError}>
                No stations available for this service.
              </Text>
            )}

            {!loadingStations &&
              stations.map((station) => {
                const isActive = selectedStationId === station.id;
                const locationLabel = [station.address, station.city]
                  .filter(Boolean)
                  .join(", ");
                return (
                  <TouchableOpacity
                    key={station.id}
                    style={[
                      styles.stationRow,
                      isActive && styles.activeStationRow,
                    ]}
                    onPress={() => setSelectedStationId(station.id)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.stationName,
                          isActive && { color: "#fff" },
                        ]}
                      >
                        {station.name}
                      </Text>
                      {locationLabel ? (
                        <Text
                          style={[
                            styles.stationLocation,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          📍 {locationLabel}
                        </Text>
                      ) : null}
                    </View>
                    {isActive && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#fff"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}

            {/* DATE */}
            <Text style={styles.sectionTitle}>Select Date</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dates.map((item) => (
                <TouchableOpacity
                  key={item.num}
                  style={[
                    styles.dateCard,
                    selectedDate === item.num && styles.activeDate,
                  ]}
                  onPress={() => setSelectedDate(item.num)}
                >
                  <Text
                    style={{
                      color: selectedDate === item.num ? "#fff" : "#000",
                    }}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={{
                      color: selectedDate === item.num ? "#fff" : "#000",
                    }}
                  >
                    {item.num}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* TIME */}
            <Text style={styles.sectionTitle}>Select Time</Text>

            <View style={styles.timeContainer}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeBtn,
                    selectedTime === time && styles.activeTime,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={{ color: selectedTime === time ? "#fff" : "#000" }}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* VEHICLE */}
            <Text style={styles.sectionTitle}>Vehicle Type</Text>

            <View style={styles.vehicleTabs}>
              <TouchableOpacity
                style={[
                  styles.vehicleTab,
                  vehicleType === "Car" && styles.activeVehicleTab,
                ]}
                onPress={() => setVehicleType("Car")}
              >
                <Text
                  style={
                    vehicleType === "Car"
                      ? styles.activeVehicleText
                      : styles.vehicleText
                  }
                >
                  Car
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.vehicleTab,
                  vehicleType === "Motorbike" && styles.activeVehicleTab,
                ]}
                onPress={() => setVehicleType("Motorbike")}
              >
                <Text
                  style={
                    vehicleType === "Motorbike"
                      ? styles.activeVehicleText
                      : styles.vehicleText
                  }
                >
                  Motorbike
                </Text>
              </TouchableOpacity>
            </View>

            {/* INPUTS */}
            <View style={styles.inputRow}>
              <TextInput placeholder="Vehicle Brand" style={styles.input} />
              <TextInput placeholder="Vehicle Number" style={styles.input} />
            </View>

            {/* CONFIRM */}
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => router.push("/(tabs)/Booking/bookingconfirm")}
            >
              <Text style={styles.confirmText}>Confirm Booking</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <Bottomnav />
      </SafeAreaView>
    </LinearGradient>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    marginTop: 40,
  },

  headerTitle: { fontSize: 20, fontWeight: "700" },

  profileImage: { width: 40, height: 40, borderRadius: 20 },

  // card: { margin: 18 },

  card: {
  margin: 18,
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 16,

  // iOS shadow
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.12,
  shadowRadius: 8,

  // Android shadow
  elevation: 5,
},

  image: { width: "100%", height: 160, borderRadius: 15 },

  shopName: { fontSize: 18, fontWeight: "700", marginTop: 10 },

  location: { color: "#666", marginTop: 5 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 18,
    marginTop: 15,
  },

  stationError: {
    marginHorizontal: 18,
    marginTop: 8,
    fontSize: 13,
    color: "#888",
  },

  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 18,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  activeStationRow: {
    backgroundColor: "#FF7A00",
    borderColor: "#FF7A00",
  },

  stationName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  stationLocation: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  dateCard: {
    width: 60,
    height: 70,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  activeDate: { backgroundColor: "#FF7A00" },

  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
  },

  timeBtn: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },

  activeTime: {
    backgroundColor: "#FF7A00",
    borderColor: "#FF7A00",
  },

  vehicleTabs: {
    flexDirection: "row",
    padding: 18,
  },

  vehicleTab: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  activeVehicleTab: {
    backgroundColor: "#FF7A00",
  },

  vehicleText: { color: "#000" },

  activeVehicleText: { color: "#fff" },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  input: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  confirmBtn: {
    backgroundColor: "rgb(255, 122, 0)",
    margin: 18,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    color: "#000",
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },

  emptyBtn: {
    backgroundColor: "#FF7A00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },

  emptyBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FF8C42",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 10,
  },
  tierBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFE8D8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },

  tierBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FF7A00",
    textTransform: "capitalize",
  },

  serviceInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 14,
  },

  serviceInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  serviceInfoText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },

  servicePrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF7A00",
  },

  confirmText: { color: "#fff", fontWeight: "700" },
});

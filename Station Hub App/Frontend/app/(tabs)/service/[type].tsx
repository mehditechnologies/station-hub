import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bottomnav from "@/components/Bottomnav";
import { API_BASE } from "../../../src/config"; // adjust relative path as needed

// const API_BASE = "http://192.168.18.95:8000";

type Tier = { price: number; duration: string };
type Service = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  rating?: number;
  image_url?: string;
  tiers?: { base?: Tier; premium?: Tier };
  station_ids?: string[];
};

export default function ServicesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();

  const [activeTab, setActiveTab] = useState(
    params.type === "premium" ? params.type : "basic",
  );
  const [services, setServices] = useState<Service[]>([]);
  const [favoriteKeys, setFavoriteKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 1800);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const servicesRes = await fetch(`${API_BASE}/services/public`);
        const servicesData = await servicesRes.json();
        if (servicesRes.ok) {
          setServices(servicesData.services || []);
        } else {
          setError(servicesData.detail || "Failed to load services");
        }

        const token = await AsyncStorage.getItem("token");
        if (token) {
          const favRes = await fetch(`${API_BASE}/favorites/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (favRes.ok) {
            const favData = await favRes.json();
            const keys = new Set<string>(
              (favData.services || []).map((s: any) => `${s.id}_${s.tier}`),
            );
            setFavoriteKeys(keys);
          }
        }
      } catch (e) {
        setError("Cannot connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = async (serviceId: string, tier: string) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      showToast("Please log in to save favorites");
      return;
    }

    const key = `${serviceId}_${tier}`;
    const isFavorited = favoriteKeys.has(key);

    setFavoriteKeys((prev) => {
      const next = new Set(prev);
      if (isFavorited) next.delete(key);
      else next.add(key);
      return next;
    });

    try {
      if (isFavorited) {
        await fetch(`${API_BASE}/favorites/${serviceId}/${tier}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast("Removed from favorites");
      } else {
        await fetch(`${API_BASE}/favorites/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ service_id: serviceId, tier }),
        });
        showToast("Added to favorites");
      }
    } catch (e) {
      setFavoriteKeys((prev) => {
        const next = new Set(prev);
        if (isFavorited) next.add(key);
        else next.delete(key);
        return next;
      });
      showToast("Something went wrong");
    }
  };

  const tierKey =
    activeTab === "premium" ? "premium" : activeTab === "basic" ? "base" : null;
  const filteredServices = tierKey
    ? services.filter((s) => s.tiers && s.tiers[tierKey])
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF4EC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 16,
          paddingTop: 0,
        }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          

          <Text style={styles.headerTitle}>Services</Text>

          
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          {["basic", "premium"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LOADING */}
        {loading && (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator color="#FF8C42" size="large" />
          </View>
        )}

        {/* ERROR */}
        {!loading && error && (
          <Text
            style={{ textAlign: "center", color: "#e74c3c", marginTop: 20 }}
          >
            {error}
          </Text>
        )}

        {/* EMPTY */}
        {!loading && !error && filteredServices.length === 0 && (
          <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
            No services available in this category yet.
          </Text>
        )}

        {/* CARDS */}
        {!loading &&
          !error &&
          tierKey &&
          filteredServices.map((service) => {
            const tier = service.tiers![tierKey]!;
            const isFavorited = favoriteKeys.has(`${service.id}_${tierKey}`);
            return (
              <View key={service.id} style={styles.card}>
                <View>
                  {service.image_url ? (
                    <Image
                      source={{ uri: service.image_url }}
                      style={styles.image}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/service1.png")}
                      style={styles.image}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.heartBtn}
                    onPress={() => toggleFavorite(service.id, tierKey)}
                  >
                    <Ionicons
                      name={isFavorited ? "heart" : "heart-outline"}
                      size={18}
                      color="#FF7A00"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{service.name}</Text>
                  {service.description ? (
                    <Text style={styles.subtitle}>{service.description}</Text>
                  ) : null}

                  <View style={styles.infoRow}>
                    {service.rating ? (
                      <View style={styles.infoItem}>
                        <Ionicons name="star" size={14} color="#FF8C42" />
                        <Text style={styles.infoText}>
                          {Number(service.rating).toFixed(1)}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.infoItem}>
                      <Ionicons name="time-outline" size={14} color="#666" />
                      <Text style={styles.infoText}>{tier.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.bottomRow}>
                    <Text style={styles.price}>
                      PKR {Number(tier.price).toLocaleString()}
                    </Text>
                    <View style={styles.btnRow}>
                      <TouchableOpacity
                        style={styles.scheduleBtn}
                        onPress={() =>
                          router.push({
                            pathname: "/(tabs)/Booking/booking",
                            params: {
                              service_id: service.id,
                              tier: tierKey,
                              name: service.name,
                              price: String(tier.price),
                              duration: tier.duration,
                              image_url: service.image_url || "",
                              station_ids: JSON.stringify(
                                service.station_ids || [],
                              ),
                            },
                          })
                        }
                      >
                        <Text style={styles.scheduleText}>Schedule</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.viewBtn}>
                        <Text style={styles.viewText}>View Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {toast.visible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <Bottomnav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF4EC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 28,
    // backgroundColor:"red",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },

  profileImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    marginBottom: 18,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#FF8C42",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },

  activeTabText: {
    color: "#fff",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },

  image: {
    width: 110,
    height: 160,
  },

  heartBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  infoText: {
    fontSize: 11,
    color: "#666",
  },

  bottomRow: {
    justifyContent: "space-between",
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF8C42",
    marginBottom: 10,
  },

  btnRow: {
    flexDirection: "row",
    gap: 8,
  },

  scheduleBtn: {
    backgroundColor: "#FF8C42",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  scheduleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  viewBtn: {
    borderWidth: 1,
    borderColor: "#FF8C42",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  viewText: {
    color: "#FF8C42",
    fontSize: 12,
    fontWeight: "600",
  },

  toast: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 6,
  },

  toastText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});

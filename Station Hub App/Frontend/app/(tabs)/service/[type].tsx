// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import Bottomnav from "@/components/Bottomnav";

// export default function ServicesScreen() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("premium");

//   const services = [1, 2, 3, 4];

//   const getTitle = () => {
//     if (activeTab === "basic") return "Basic Detail";
//     if (activeTab === "addons") return "Add-ons Detail";
//     return "Premium Detail";
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF4EC" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 40 }}
//       >
//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>

//           <Text style={styles.headerTitle}>Services</Text>

//           <Image
//             source={require("../../../assets/images/johndoe.png")}
//             style={styles.profileImg}
//           />
//         </View>

//         {/* TABS */}
//         <View style={styles.tabContainer}>
//           {["basic", "premium", "addons"].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               onPress={() => setActiveTab(tab)}
//               style={[styles.tab, activeTab === tab && styles.activeTab]}
//             >
//               <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
//                 {tab === "addons" ? "Add-ons" : tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* CARDS */}
//         {services.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <Image
//               source={require("../../../assets/images/service1.png")}
//               style={styles.image}
//             />
//             <View style={styles.cardContent}>
//               <Text style={styles.title}>{getTitle()}</Text>
//               <Text style={styles.subtitle}>Riverside Detailing</Text>

//               <View style={styles.infoRow}>
//                 <View style={styles.infoItem}>
//                   <Ionicons name="location-outline" size={14} color="#666" />
//                   <Text style={styles.infoText}>0.35 mi away</Text>
//                 </View>
//                 <View style={styles.infoItem}>
//                   <Ionicons name="star" size={14} color="#FF8C42" />
//                   <Text style={styles.infoText}>4.0</Text>
//                 </View>
//                 <View style={styles.infoItem}>
//                   <Ionicons name="time-outline" size={14} color="#666" />
//                   <Text style={styles.infoText}>20-30 min</Text>
//                 </View>
//               </View>

//               <View style={styles.bottomRow}>
//                 <Text style={styles.price}>$20.50</Text>
//                 <View style={styles.btnRow}>
//                   <TouchableOpacity style={styles.scheduleBtn}>
//                     <Text style={styles.scheduleText}>Schedule</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.viewBtn}>
//                     <Text style={styles.viewText}>View Detail</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <Bottomnav />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF4EC",
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 18,
//   },

//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#000",
//   },

//   profileImg: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//   },

//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 30,
//     padding: 5,
//     marginBottom: 18,
//   },

//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 25,
//     alignItems: "center",
//   },

//   activeTab: {
//     backgroundColor: "#FF8C42",
//   },

//   tabText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#999",
//   },

//   activeTabText: {
//     color: "#fff",
//   },

//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     overflow: "hidden",
//     marginBottom: 16,
//     elevation: 3,
//   },

//   image: {
//     width: 110,
//     height: 160,
//   },

//   cardContent: {
//     flex: 1,
//     padding: 12,
//     justifyContent: "space-between",
//   },

//   title: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#000",
//   },

//   subtitle: {
//     fontSize: 13,
//     color: "#777",
//     marginTop: 2,
//     marginBottom: 8,
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },

//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//   },

//   infoText: {
//     fontSize: 11,
//     color: "#666",
//   },

//   bottomRow: {
//     justifyContent: "space-between",
//   },

//   price: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#FF8C42",
//     marginBottom: 10,
//   },

//   btnRow: {
//     flexDirection: "row",
//     gap: 8,
//   },

//   scheduleBtn: {
//     backgroundColor: "#FF8C42",
//     paddingVertical: 7,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//   },

//   scheduleText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   viewBtn: {
//     borderWidth: 1,
//     borderColor: "#FF8C42",
//     paddingVertical: 7,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//   },

//   viewText: {
//     color: "#FF8C42",
//     fontSize: 12,
//     fontWeight: "600",
//   },
// });





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
import Bottomnav from "@/components/Bottomnav";

const API_BASE = "http://192.168.18.95:8000";

type Tier = { price: number; duration: string };
type Service = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  rating?: number;
  image_url?: string;
  tiers?: { base?: Tier; premium?: Tier };
};

export default function ServicesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();

  const [activeTab, setActiveTab] = useState(
  params.type === "premium" ? params.type : "basic"
);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/services/public`);
        const data = await res.json();
        if (res.ok) {
          setServices(data.services || []);
        } else {
          setError(data.detail || "Failed to load services");
        }
      } catch (e) {
        setError("Cannot connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const tierKey = activeTab === "premium" ? "premium" : activeTab === "basic" ? "base" : null;
  const filteredServices = tierKey
    ? services.filter((s) => s.tiers && s.tiers[tierKey])
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF4EC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 40 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Services</Text>

          <Image
            source={require("../../../assets/images/johndoe.png")}
            style={styles.profileImg}
          />
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          {["basic", "premium"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab === "addons" ? "Add-ons" : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
          <Text style={{ textAlign: "center", color: "#e74c3c", marginTop: 20 }}>
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
            return (
              <View key={service.id} style={styles.card}>
                {service.image_url ? (
                  <Image source={{ uri: service.image_url }} style={styles.image} />
                ) : (
                  <Image
                    source={require("../../../assets/images/service1.png")}
                    style={styles.image}
                  />
                )}
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{service.name}</Text>
                  {service.description ? (
                    <Text style={styles.subtitle}>{service.description}</Text>
                  ) : null}

                  <View style={styles.infoRow}>
                    {service.rating ? (
                      <View style={styles.infoItem}>
                        <Ionicons name="star" size={14} color="#FF8C42" />
                        <Text style={styles.infoText}>{Number(service.rating).toFixed(1)}</Text>
                      </View>
                    ) : null}
                    <View style={styles.infoItem}>
                      <Ionicons name="time-outline" size={14} color="#666" />
                      <Text style={styles.infoText}>{tier.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.bottomRow}>
                    <Text style={styles.price}>PKR {Number(tier.price).toLocaleString()}</Text>
                    <View style={styles.btnRow}>
                      <TouchableOpacity style={styles.scheduleBtn}>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
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
});
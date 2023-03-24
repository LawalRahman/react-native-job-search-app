import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../../../constants";

import styles from "./nearbyjobs.style";

import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import useFetch from "../../../hooks/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const { isLoading, error, data, reFetch } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => {}}>
          <Text style={styles.headerBtn}>Show more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} colors={COLORS.primary} />
        ) : error ? (
          <Text onPress={reFetch}>Something went wrong</Text>
        ) : (
          data.map((job, index) => (
            <NearbyJobCard
              job={job}
              key={index}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;

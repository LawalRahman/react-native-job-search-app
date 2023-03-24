import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../../../constants";

import styles from "./popularjobs.style";

import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { isLoading, error, data, reFetch } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} colors={COLORS.primary} />
        ) : error ? (
          <Text onPress={reFetch}>Something went wrong</Text>
        ) : (
          <FlatList
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal={true}
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={() => handleCardPress(item)}
                selectedJob={selectedJob}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;

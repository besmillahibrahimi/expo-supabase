import { useColor } from "@/hooks/use-color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colors = useColor('--color-primary-500', );
  
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        
        options={{
          title: "Home", 
          tabBarActiveTintColor: colors,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? colors : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarActiveTintColor: colors,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={24}
              color={focused ? colors : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-courses"
        options={{
          title: "My Courses",
          tabBarActiveTintColor: colors,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="book"
              size={24}
              color={focused ? colors : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarActiveTintColor: colors,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? colors : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

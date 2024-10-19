import React from "react";
import AddAddress from "./components/AddAddress";
import AllAddress from "./components/AllAddress";
import SideBar from "./components/SideBar";
import { useTheme } from "./context/themeContext";
import { useAuth } from "./context/userContext";
import LoginScreen from "./components/LoginScreen";
import Navbar from "./components/Navbar";

function App() {
  const { theme } = useTheme();
  const [isActive, setIsActive] = React.useState("user");
  const { user } = useAuth();

  // Check for small screen size (e.g., 768px or below)
  let isMobile = window.innerWidth <= 768;

  window.addEventListener("resize", () => {
    isMobile = window.innerWidth <= 768;
  });

  const addresses = [
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    {
      id: 2,
      name: "Office",
      street: "456 Work Rd",
      city: "Businesstown",
      state: "NY",
      zip: "67890",
    },
    {
      id: 3,
      name: "Office",
      street: "456 Work Rd",
      city: "Businesstown",
      state: "NY",
      zip: "67890",
    },
  ];



  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: theme.background,
        display: "flex",
        flexDirection: isMobile ? "column" : "row", 
      }}
    >
      <Navbar />
      {user === null ? (
        <LoginScreen />
      ) : (
        <>
          <SideBar isActive={isActive} setIsActive={setIsActive} />
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                display: "flex",
                justifyContent: "flex-start",
                backgroundColor: theme.background,
                paddingTop: "8%",
              }}
            >
              {isActive === "user" && <AddAddress />}
              {isActive === "address" && (
                <AllAddress
                  addresses={user?.data?.addresses || []}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

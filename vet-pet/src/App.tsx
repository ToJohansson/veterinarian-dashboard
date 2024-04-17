import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import PetForm from "./components/forms/PetForm";
import FilterLists from "./components/lists/FilterLists";
import LoginPage from "./components/auth/LoginPage";

const MainContent = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isPetFormVisible, setIsPetFormVisible] = useState(false);

  const [showComponent, setShowComponent] = useState("default");

  const handleRegistrationForm = () => {
    setIsPetFormVisible(true);
    setShowComponent("form");
  };

  const handleLists = () => {
    setShowComponent("lists");
    setIsPetFormVisible(false);
  };

  const handleDefaultView = () => {
    setShowComponent("default");
    setIsPetFormVisible(false);
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };
  const logoutAuth = () => {
    setAuthenticated(false);
    setIsPetFormVisible(false);
  };

  useEffect(() => {}, [showComponent]);
  return (
    <>
      {isAuthenticated ? (
        <Flex bg="green.400">
          <Grid
            templateAreas={`"header header"
                        "nav main"`}
            gridTemplateRows={"50px 1fr"}
            gridTemplateColumns={"200px 1fr"}
            h={isPetFormVisible ? "auto" : "calc(100vh)"}
            gap="1"
            fontWeight="bold"
            pl="14"
            pr="14"
            pt="5"
            pb="5"
            borderRadius="md"
            flex="1"
            flexDirection="column"
          >
            <GridItem
              pl="2"
              area={"header"}
              borderRadius="md"
              bg="white"
              fontSize="1.2rem"
              display="flex"
              m="1"
              alignItems="center"
            >
              <HStack>
                <Box p="2">
                  <Input
                    variant="filled"
                    size={"md"}
                    placeholder="Search"
                  ></Input>
                </Box>
                <Box>
                  <b>Admin dashboard</b>
                </Box>
              </HStack>
            </GridItem>

            <Box position="relative">
              <GridItem
                pl="2"
                area={"nav"}
                borderRadius="md"
                p="2"
                m="1"
                fontSize="1.2rem"
                bg="white"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
              >
                <Box>
                  <Box>
                    <Text fontWeight="bold">Navigation</Text>
                  </Box>
                  <Box>
                    <Button
                      mt={6}
                      bg="green.100"
                      size="sm"
                      onClick={handleDefaultView}
                      w="100%"
                    >
                      Start
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      mt={2}
                      bg="green.100"
                      size="sm"
                      onClick={handleRegistrationForm}
                      w="100%"
                    >
                      New Appointment
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      mt={2}
                      bg="green.100"
                      size="sm"
                      onClick={handleLists}
                      w="100%"
                    >
                      Appointments
                    </Button>
                  </Box>
                </Box>
                <Box mb={2}>
                  <Button bg="blue.200" size="sm" onClick={logoutAuth}>
                    Logout
                  </Button>
                </Box>
              </GridItem>
            </Box>

            <GridItem
              pl="2"
              area={"main"}
              borderRadius="md"
              p="2"
              m="1"
              fontSize="1.2rem"
              bg="white"
            >
              {showComponent === "form" && (
                <>
                  Pet Form
                  <Box p={4}>
                    <PetForm />
                  </Box>
                </>
              )}
              {showComponent === "lists" && (
                <>
                  <Box p={4}>
                    <FilterLists />
                  </Box>
                </>
              )}
              {showComponent === "default" && (
                <Box p={4} m={4}>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Welcome to PetVet Admin dashboard!
                  </Text>
                  <Text mb={4}>
                    Here, administrators and support staff have the tools at
                    their fingertips to efficiently manage appointments and
                    ensure seamless operations.
                  </Text>
                  <Text mb={4}>
                    To get started, use the navigation bar on the right.
                  </Text>
                  <Text mb={4}>
                    Click on the 'New Appointment' button to create a new
                    booking, or select 'Appointments' to view a comprehensive
                    list of scheduled visits.
                  </Text>
                  <Text mb={4}>Need to go back?</Text>
                  <Text mb={4}>
                    Simply hit the 'Start' button to return to the start.
                  </Text>
                  <Text mb={4}>
                    Let'smake caring for our animal companions as smooth as
                    possible.
                  </Text>
                </Box>
              )}
            </GridItem>
          </Grid>
        </Flex>
      ) : (
        <LoginPage handleLogin={handleLogin} />
      )}
    </>
  );
};

export default MainContent;

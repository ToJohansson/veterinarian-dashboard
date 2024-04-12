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
  const [isListsVisible, setIsListsVisible] = useState(false);

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
                  <b>Welcome to PetVet</b>
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
                      Pet form
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
                      Lists
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
                    Welcome to PetVet!
                  </Text>
                  <Text mb={4}>
                    We're delighted to welcome you and your furry friend to our
                    online home. At PetVet, we understand that your pet is more
                    than just an animal—they're a cherished member of your
                    family.
                  </Text>
                  <Text mb={4}>
                    Whether it's a routine check-up, an unexpected ailment, or
                    simply seeking advice on how to keep your pet healthy and
                    happy, we're here to provide compassionate care and expert
                    guidance every step of the way.
                  </Text>
                  <Text mb={4}>
                    Feel free to explore our website and learn more about our
                    services, our dedicated team, and the personalized care we
                    offer to pets of all shapes and sizes.
                  </Text>
                  <Text mb={4}>
                    Don't hesitate to reach out if you have any questions or
                    concerns. We're here to make sure your pet receives the best
                    care possible.
                  </Text>
                  <Text>
                    Thank you for choosing PetVet. We can't wait to meet you and
                    your beloved companion!
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

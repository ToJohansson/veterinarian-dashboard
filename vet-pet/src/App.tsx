import { Box, Button, Grid, GridItem, HStack, Input } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import PetForm from "./components/forms/PetForm";
import LoginPage from "./components/auth/LoginPage";
function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isPetFormVisible, setPetForm] = useState(false);

  const handleRegistrationForm = useCallback(() => {
    setPetForm((prev) => !prev);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };
  const logoutAuth = () => {
    setAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <Grid
          templateAreas={`"header header"
                        "nav main"`}
          gridTemplateRows={"50px 1fr"}
          gridTemplateColumns={"200px 1fr"}
          h={isPetFormVisible ? "auto" : "calc(100vh)"}
          gap="1"
          fontWeight="bold"
          bg="green.400"
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
          <GridItem
            pl="2"
            area={"nav"}
            borderRadius="md"
            p="2"
            m="1"
            fontSize="1.2rem"
            bg="white"
          >
            Navigation
            <Box>
              <Button bg="green.100" size="sm" onClick={handleRegistrationForm}>
                Pet form
              </Button>
            </Box>
            <Box>
              <Button bg="blue.200" size="sm" onClick={logoutAuth}>
                Logout
              </Button>
            </Box>
          </GridItem>
          <GridItem
            pl="2"
            area={"main"}
            borderRadius="md"
            p="2"
            m="1"
            fontSize="1.2rem"
            bg="white"
          >
            {isPetFormVisible ? (
              <>
                Pet Form
                <Box p={4}>
                  <PetForm />
                </Box>
              </>
            ) : (
              <Box>
                If your pet is ill, please fill out the form to the left
              </Box>
            )}
          </GridItem>
        </Grid>
      ) : (
        <LoginPage handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;

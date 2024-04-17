import { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  Text,
  InputRightElement,
  Alert,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { getAdmins } from "../../services/api/crud-admin";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  handleLogin: () => void;
}

interface Admin {
  username: string;
  password: string;
}
const LoginPage = ({ handleLogin }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const admins = await getAdmins();
        setAdminList(admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundAdmin = adminList.find((admin) => {
      return admin.username === username && admin.password === password;
    });
    console.log(foundAdmin);
    if (foundAdmin) {
      handleLogin();
    } else {
      setErrorMessage("Wrong username or password");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      {showAlert && <Alert>Call for support!</Alert>}

      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">PetVet</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errorMessage && (
                  <Box>
                    <Text color="red">{errorMessage}</Text>
                  </Box>
                )}
                <FormHelperText textAlign="right">
                  <Link onClick={() => setShowAlert((prev) => !prev)}>
                    forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginPage;

import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../../services/AxiosInstance";
import {
  Box,
  Grid,
  ListItem,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";

interface Owner {
  ownerId: number;
  name: string;
  address: {
    street: string;
    phone: number;
  };
  pets: {
    name: string;
    age: number;
  };
}

const OwnerList = () => {
  const [ownerList, setOwners] = useState<Owner[]>([]);
  const [expandedOwner, setExpandedOwner] = useState(null);
  const handleSetOwners = useCallback((data: any) => {
    setOwners(data);
  }, []);

  useEffect(() => {
    instance
      .get("/owner/all")
      .then((res) => {
        handleSetOwners(res.data);
      })
      .catch((err) => console.log(err));
  }, [handleSetOwners]);

  useEffect(() => {
    console.log(ownerList);
  }, [ownerList]);

  const toggleExpandedOwner = (ownerId: any) => {
    if (expandedOwner === ownerId) {
      setExpandedOwner(null);
    } else {
      setExpandedOwner(ownerId);
    }
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Owner Name</Th>
            <Th>Pet Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ownerList.map((owner) => (
            <React.Fragment key={owner.ownerId}>
              <Tr
                onClick={() => toggleExpandedOwner(owner.ownerId)}
                style={{ cursor: "pointer" }}
              >
                <Td>{owner.name}</Td>
                <Td>{owner.pets.name}</Td>
              </Tr>
              {expandedOwner === owner.ownerId && (
                <Tr>
                  <Td colSpan={4}>
                    <Grid templateColumns="1fr 1fr" gap={4}>
                      <Box p={4}>
                        <Text>
                          <strong>Owner ID:</strong> {owner.ownerId}
                        </Text>
                        <Text>
                          <strong>Address:</strong> {owner.address.street}
                        </Text>
                        <Text>
                          <strong>Phone:</strong> {owner.address.phone}
                        </Text>
                      </Box>
                      <Box p={4}>
                        <Text>
                          <strong>Pet Name:</strong> {owner.pets.name}
                        </Text>
                        <Text>
                          <strong>Pet Age:</strong> {owner.pets.age}
                        </Text>
                      </Box>
                    </Grid>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OwnerList;

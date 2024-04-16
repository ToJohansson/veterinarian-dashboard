import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../../services/AxiosInstance";
import {
  Box,
  Grid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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
    gender: string;
    comment: string;
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
                <Td>{owner.pets ? owner.pets.name : "No pet"}</Td>
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
                          <strong>Age:</strong> {owner.pets.age}
                        </Text>
                        <Text>
                          <strong>Gender:</strong> {owner.pets.gender}
                        </Text>
                        <Text>
                          <strong>Comment:</strong> {owner.pets.comment}
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

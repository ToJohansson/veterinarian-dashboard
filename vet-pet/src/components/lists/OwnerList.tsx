import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../../services/AxiosInstance";
import {
  Box,
  FormLabel,
  Grid,
  Table,
  TableContainer,
  TagLabel,
  Tbody,
  Td,
  Text,
  Textarea,
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
        {!expandedOwner && (
          <Thead>
            <Tr>
              <Th>Owner Name</Th>
              <Th>Pet Name</Th>
            </Tr>
          </Thead>
        )}
        <Tbody>
          {ownerList.map((owner, index) => (
            <React.Fragment key={owner.ownerId}>
              {!expandedOwner && (
                <Tr
                  onClick={() => toggleExpandedOwner(owner.ownerId)}
                  style={{ cursor: "pointer" }}
                >
                  <Td>{owner.name}</Td>
                  <Td>{owner.pets ? owner.pets.name : "No pet"}</Td>
                </Tr>
              )}
              {expandedOwner === owner.ownerId && (
                <Td onClick={() => toggleExpandedOwner(owner.ownerId)}>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box p={4}>
                      <Text>
                        <strong>Owner Name:</strong> {owner.name}
                      </Text>
                      <Text mt={2}>
                        <strong>Owner ID:</strong> {owner.ownerId}
                      </Text>
                      <Text mt={2}>
                        <strong>Address:</strong> {owner.address.street}
                      </Text>
                      <Text mt={2}>
                        <strong>Phone:</strong> {owner.address.phone}
                      </Text>
                    </Box>
                    <Box p={4}>
                      <Text>
                        <strong>Pet Name:</strong> {owner.pets.name}
                      </Text>
                      <Text mt={2}>
                        <strong>Age:</strong> {owner.pets.age}
                      </Text>
                      <Text mt={2}>
                        <strong>Gender:</strong> {owner.pets.gender}
                      </Text>
                      <Text mt={2}>
                        <FormLabel>
                          <strong>Comment:</strong>
                        </FormLabel>
                        <Textarea bg="white">{owner.pets.comment}</Textarea>
                      </Text>
                    </Box>
                  </Grid>
                </Td>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OwnerList;

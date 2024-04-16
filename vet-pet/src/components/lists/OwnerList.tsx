import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../../services/AxiosInstance";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
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
  useDisclosure,
} from "@chakra-ui/react";
import { deleteOwner } from "../../services/api/crud-owner";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingOwnerId, setDeletingOwnerId] = useState<number | null>(null);

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

  const handleDelete = async (id: number) => {
    onOpen();
    try {
      // Optimistically remove the owner from the list
      const updatedOwners = ownerList.filter((owner) => owner.ownerId !== id);
      setOwners(updatedOwners);

      // Send the delete request
      await deleteOwner(id);
    } catch (error) {
      // If deletion fails, revert the UI state
      setOwners((prevOwners) => [...prevOwners]); // Reset ownerList to its previous state

      // Handle errors, maybe show an error message to the user
      console.error("Error deleting owner:", error);
    }
  };

  return (
    <>
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
            {ownerList.map((owner) => (
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
                  <Tr onClick={() => toggleExpandedOwner(owner.ownerId)}>
                    <Td colSpan={2}>
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
                            <Textarea
                              bg="white"
                              value={owner.pets.comment}
                              readOnly
                            />
                          </Text>
                        </Box>
                      </Grid>
                      <Button
                        bg="red.400"
                        onClick={() => {
                          setDeletingOwnerId(owner.ownerId);
                          onOpen();
                        }}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning: Deleting Owner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to delete the owner? 🐾</Text>
            <Text>
              Are you sure you want to delete this owner? This action cannot be
              undone and will permanently remove all associated data from the
              database.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Flex alignItems="center">
              <Text>(555) 123-4567: call support</Text>
            </Flex>
            <Spacer />
            <Button
              onClick={() => {
                if (deletingOwnerId !== null) {
                  console.log("id", deletingOwnerId);
                  handleDelete(deletingOwnerId);
                  setDeletingOwnerId(null);
                  onClose();
                }
              }}
              colorScheme="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OwnerList;

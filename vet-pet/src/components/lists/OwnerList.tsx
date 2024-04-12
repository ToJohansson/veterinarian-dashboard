import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../../services/AxiosInstance";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

const OwnerList = () => {
  const [ownerList, setOwners] = useState([]);

  // Memoize the callback function using useCallback
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

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <h4>Owners</h4>
      <UnorderedList>
        {ownerList.map((owner) => (
          <ListItem key={owner.ownerId}>{owner.name}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default OwnerList;

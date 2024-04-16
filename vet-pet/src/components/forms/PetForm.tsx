import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Flex,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { postOwner, putOwner } from "../../services/api/crud-owner";

const petSchema = z.object({
  pname: z
    .string()
    .min(4, { message: "Pet name must be at least 4 characters long" }),
  age: z.number().int().positive(),
  gender: z.string({
    invalid_type_error: "Please add gender",
  }),
  comment: z.string(),
  oname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  street: z
    .string()
    .min(2, { message: "Adress must be at least 2 characters long" }),
  phone: z.number({ invalid_type_error: "Please add a valid number" }),
});
type FormData = z.infer<typeof petSchema>;

export default function PetForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(petSchema) });

  const onSubmit = async (data: FieldValues) => {
    const ownerData = { name: data.oname };
    const adressData = {
      street: data.street,
      phone: data.phone,
    };
    const petData = {
      name: data.pname,
      age: data.age,
      gender: data.gender,
      comment: data.comment,
    };

    try {
      const resData = await postOwner(ownerData);
      const putData = {
        id: resData.ownerId,
        name: resData.name,
        address: { street: adressData.street, phone: adressData.phone },
        pets: {
          name: petData.name,
          age: petData.age,
          gender: petData.gender,
          comment: petData.comment,
        },
      };
      await putOwner(putData);

      onOpen();
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="pname">Pet name</FormLabel>
        <Input
          id="pname"
          placeholder="Pet name"
          {...register("pname")}
          type="text"
        />
        {errors.pname && <p style={{ color: "red" }}>{errors.pname.message}</p>}

        <FormLabel htmlFor="age" pt={2}>
          Pet age
        </FormLabel>
        <Input
          id="age"
          placeholder="Pet age"
          {...register("age", { valueAsNumber: true })}
          type="number"
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}

        <FormLabel htmlFor="gender" pt={2}>
          What gender is you pet?
        </FormLabel>
        <RadioGroup id="gender" defaultValue="2">
          <Stack spacing={5} direction="row">
            <Radio colorScheme="green" value="Male" {...register("gender")}>
              Male
            </Radio>
            <Radio colorScheme="green" value="Female" {...register("gender")}>
              Female
            </Radio>
          </Stack>
        </RadioGroup>
        {errors.gender && (
          <p style={{ color: "red" }}>{errors.gender.message}</p>
        )}

        <FormLabel htmlFor="comment" pt={2}>
          Comment
        </FormLabel>
        <Textarea
          id="comment"
          size="lg"
          placeholder="Comment on the sickness"
          {...register("comment")}
        ></Textarea>

        <Box p={4}></Box>

        <FormLabel htmlFor="oname">Owners name</FormLabel>
        <Input
          id="oname"
          placeholder="Owners name"
          {...register("oname")}
          type="text"
        />
        {errors.oname && <p style={{ color: "red" }}>{errors.oname.message}</p>}

        <FormLabel htmlFor="adress" pt={2}>
          Adress
        </FormLabel>
        <Input
          id="adress"
          placeholder="Street"
          {...register("street")}
          type="text"
        />
        {errors.street && (
          <p style={{ color: "red" }}>{errors.street.message}</p>
        )}

        <FormLabel htmlFor="phone" pt={2}>
          Phone
        </FormLabel>
        <Input
          id="phone"
          placeholder="Phone"
          {...register("phone", { valueAsNumber: true })}
          type="number"
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

        <Box p={6}></Box>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </FormControl>
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Pet has been successfully registered with us! 🐾</Text>
            <Text>You can look at the form in the Appointments tab 🐾</Text>
          </ModalBody>
          <ModalFooter>
            <Flex alignItems="center">
              <Icon as={PhoneIcon} boxSize={5} mr={2} />
              <Text>(555) 123-4567: call support</Text>
            </Flex>
            <Spacer />
            <Button onClick={onClose} colorScheme="green">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}

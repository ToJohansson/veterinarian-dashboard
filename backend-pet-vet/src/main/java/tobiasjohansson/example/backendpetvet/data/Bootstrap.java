package tobiasjohansson.example.backendpetvet.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tobiasjohansson.example.backendpetvet.models.Address;
import tobiasjohansson.example.backendpetvet.models.Owner;
import tobiasjohansson.example.backendpetvet.models.Pet;
import tobiasjohansson.example.backendpetvet.repositories.AddressRepository;
import tobiasjohansson.example.backendpetvet.repositories.OwnerRepository;
import tobiasjohansson.example.backendpetvet.repositories.PetRepository;

import java.util.List;

@Component
public class Bootstrap implements CommandLineRunner {
    @Autowired
    private OwnerRepository ownerRepository;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public void run(String... args) throws Exception {
        Address address1 = new Address();
        address1.setPhone(0761234562);
        address1.setStreet("Varberg");
        addressRepository.save(address1);

        Address address2 = new Address();
        address2.setPhone(0761234562);
        address2.setStreet("Umeå");
        addressRepository.save(address2);

        Owner owner1 = new Owner();
        owner1.setName("Tobias Johansson");
        ownerRepository.save(owner1);

        Owner owner2 = new Owner();
        owner2.setName("Elias Johansson");
        ownerRepository.save(owner2);

        Pet pet1 = new Pet();
        pet1.setName("Barbro");
        pet1.setAge(3);
        petRepository.save(pet1);

        Pet pet2 = new Pet();
        pet2.setName("Spencer");
        pet2.setAge(1);
        petRepository.save(pet2);

        // ADD ADDRESSES AND PETS AND OWNERS TO PERSISTED MODELS
        owner1.setPets(pet1);
        owner1.setAddress(address1);
        ownerRepository.save(owner1);

        owner2.setPets(pet2);
        owner2.setAddress(address2);
        ownerRepository.save(owner2);


    }
}
/*


        pet1.setOwner(owner1);
        petRepository.save(pet1);

        pet2.setOwner(owner2);
        petRepository.save(pet2);



* */
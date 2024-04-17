package tobiasjohansson.example.backendpetvet.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tobiasjohansson.example.backendpetvet.models.Address;
import tobiasjohansson.example.backendpetvet.models.Admin;
import tobiasjohansson.example.backendpetvet.models.Owner;
import tobiasjohansson.example.backendpetvet.models.Pet;
import tobiasjohansson.example.backendpetvet.repositories.AddressRepository;
import tobiasjohansson.example.backendpetvet.repositories.AdminRepository;
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

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public void run(String... args) throws Exception {

        // ADMIN LOGIN CREDENTIALS
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword("admin");
        adminRepository.save(admin);

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
        pet1.setGender("female");
        pet1.setComment("broke a tooth");
        petRepository.save(pet1);

        Pet pet2 = new Pet();
        pet2.setName("Spencer");
        pet2.setAge(1);
        pet2.setGender("male");
        pet2.setComment("anxious");
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

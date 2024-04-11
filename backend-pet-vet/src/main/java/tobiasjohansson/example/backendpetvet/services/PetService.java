package tobiasjohansson.example.backendpetvet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tobiasjohansson.example.backendpetvet.exceptions.ResourceNotFoundException;
import tobiasjohansson.example.backendpetvet.models.Pet;
import tobiasjohansson.example.backendpetvet.repositories.PetRepository;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public PetService (){

    }

    // GET
    public Pet getPet (int id)throws ResourceNotFoundException {
        return petRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Pet","ID", id));
    }
    public List<Pet> getAllPets (){
        return  petRepository.findAll();
    }
    // SAVE
    public Pet savePet (Pet pet) {
        return petRepository.save(pet);
    }
    // DELETE
    public void deletePet (int id) throws ResourceNotFoundException {
        petRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Pet","ID",id));
        petRepository.deleteById(id);
    }
    // UPDATE
    public Pet updatePet(int id, Pet newPet) throws ResourceNotFoundException {
        Pet oldPet = petRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Pet", "ID", id));

        oldPet.setName( newPet.getName());
        oldPet.setAge(newPet.getAge());

        return petRepository.save(oldPet);
    }
}

package tobiasjohansson.example.backendpetvet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tobiasjohansson.example.backendpetvet.exceptions.ResourceNotFoundException;
import tobiasjohansson.example.backendpetvet.models.Owner;
import tobiasjohansson.example.backendpetvet.repositories.OwnerRepository;

import java.util.List;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    public  OwnerService () {

    }

    // GET
    public Owner getOwner(int id)throws ResourceNotFoundException {
        return ownerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Owner", "ID", id));

    }
    public List<Owner> getAllOwners (){
        return ownerRepository.findAll();
    }

    // SAVE
    public Owner saveOwner (Owner owner) {
        return ownerRepository.save(owner);
    }
    // DELETE
    public void deleteOwner (int id)throws ResourceNotFoundException {
        ownerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Owner", "ID", id));
        ownerRepository.deleteById(id);
    }

    // UPDATE
    public Owner updateOwner (int id, Owner newOwner) throws ResourceNotFoundException {
        Owner oldOwner = ownerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Owner", "ID", id));

        oldOwner.setName(newOwner.getName());
        oldOwner.setAddress(newOwner.getAddress());
        oldOwner.setPets(newOwner.getPets());

        return ownerRepository.save(oldOwner);
    }
}

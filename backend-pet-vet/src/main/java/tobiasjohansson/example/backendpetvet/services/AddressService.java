package tobiasjohansson.example.backendpetvet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tobiasjohansson.example.backendpetvet.exceptions.ResourceNotFoundException;
import tobiasjohansson.example.backendpetvet.models.Address;
import tobiasjohansson.example.backendpetvet.repositories.AddressRepository;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public AddressService () {

    }

    // GET
    public Address getAddress (int id) throws ResourceNotFoundException {
        return addressRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Address","ID", id));
    }
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }
    // SAVE
    public Address saveAddress (Address address) {
        return addressRepository.save(address);
    }

    // DELETE
    public void deleteAddress (int id) throws ResourceNotFoundException {
        addressRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Address", "ID", id));
        addressRepository.deleteById(id);
    }

    // UPDATE
    public Address updateAddress (int id, Address newAddress) throws ResourceNotFoundException{
        Address oldAddress = addressRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Address", "ID", id));
        oldAddress.setStreet(newAddress.getStreet());
        oldAddress.setPhone(newAddress.getPhone());

        return addressRepository.save(oldAddress);
    }
}

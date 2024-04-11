package tobiasjohansson.example.backendpetvet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tobiasjohansson.example.backendpetvet.models.Address;
import tobiasjohansson.example.backendpetvet.services.AddressService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    public AddressController() {
    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddress (@PathVariable("id") int id){
        return new ResponseEntity<Address>(addressService.getAddress(id),HttpStatus.OK);
    }
    @GetMapping("/all")
    public List<Address> getAllAddresses(){
        return addressService.getAllAddresses();
    }
    // SAVE
    @PostMapping("/newaddress")
    public ResponseEntity<Address> saveAddress(@RequestBody Address address) {
        return new ResponseEntity<Address>(addressService.saveAddress(address), HttpStatus.CREATED);
    }
    // DELETE
    @DeleteMapping("/deleteaddress/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable("id") int id){
        addressService.deleteAddress(id);
        return new ResponseEntity<String>("Address with ID " + id + " was deleted", HttpStatus.OK);
    }
    // UPDATE
    @PutMapping("/updateaddress/{id}")
    public ResponseEntity<Address> updateAddress (@PathVariable("id") int id, @RequestBody Address address){
        return new ResponseEntity<Address>(addressService.updateAddress(id, address),HttpStatus.OK);
    }
}

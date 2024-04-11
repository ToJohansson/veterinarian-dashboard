package tobiasjohansson.example.backendpetvet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tobiasjohansson.example.backendpetvet.models.Pet;
import tobiasjohansson.example.backendpetvet.services.PetService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pet")
public class PetController {

    @Autowired
    private PetService petService;

    public PetController (){
    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPet(@PathVariable("id") int id){
        return new ResponseEntity<Pet>(petService.getPet(id), HttpStatus.OK);
    }
    @GetMapping("all")
    public List<Pet> getAllPets(){
        return petService.getAllPets();
    }
    // SAVE
    @PostMapping("/newpet")
    public ResponseEntity<Pet> savePet(@RequestBody Pet pet){
        return new ResponseEntity<Pet>(petService.savePet(pet), HttpStatus.CREATED);
    }
    // DELETE
    @DeleteMapping("/deletepet/{id}")
    public ResponseEntity<String> deletePet(@PathVariable("id") int id){
        petService.deletePet(id);
        return new ResponseEntity<String>("Pet with ID " + id + " was deleted", HttpStatus.OK);
    }
    // UPDATE
    @PutMapping("/updatepet/{id}")
    public ResponseEntity<Pet> deletePet(@PathVariable("id") int id, @RequestBody Pet pet){
        return new ResponseEntity<Pet>(petService.updatePet(id,pet), HttpStatus.OK);
    }
}

package tobiasjohansson.example.backendpetvet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tobiasjohansson.example.backendpetvet.models.Owner;
import tobiasjohansson.example.backendpetvet.services.OwnerService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    public OwnerController (){

    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<Owner> getOwner(@PathVariable("id") int id) {
        return new ResponseEntity<Owner>(ownerService.getOwner(id), HttpStatus.OK);
    }
    @GetMapping("/all")
    public List<Owner> getAllOwners(){
        return ownerService.getAllOwners();
    }
    // SAVE
    @PostMapping("/newowner")
    public ResponseEntity<Owner> saveOwner(@RequestBody Owner owner) {
        return new ResponseEntity<Owner>(ownerService.saveOwner(owner), HttpStatus.CREATED);
    }
    // DELETE
    @DeleteMapping("/deleteowner/{id}")
    public ResponseEntity<String> deleteOwner(@PathVariable("id") int id) {
        ownerService.deleteOwner(id);
        return new ResponseEntity<String>("Owner was deleted with ID " + id, HttpStatus.OK);
    }
    // UPDATE
    @PutMapping("/updateowner/{id}")
    public ResponseEntity<Owner> updateOwner(@PathVariable("id") int id, @RequestBody Owner owner){
        return new ResponseEntity<Owner>(ownerService.updateOwner(id,owner), HttpStatus.OK);
    }

}

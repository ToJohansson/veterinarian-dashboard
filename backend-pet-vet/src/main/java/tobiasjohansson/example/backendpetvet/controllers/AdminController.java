package tobiasjohansson.example.backendpetvet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tobiasjohansson.example.backendpetvet.models.Admin;
import tobiasjohansson.example.backendpetvet.services.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    public AdminController() {
    }

    // GET
    @GetMapping("/alladmins")
    private List<Admin> getAllAdmins(){
        return adminService.getAllAdmins();
    }
    // POST
    @PostMapping("/newadmin")
    private ResponseEntity<Admin> postAdmin (@RequestBody Admin admin){
        return new ResponseEntity<Admin>(adminService.postAdmin(admin), HttpStatus.CREATED);
    }
}

package tobiasjohansson.example.backendpetvet.services;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tobiasjohansson.example.backendpetvet.models.Admin;
import tobiasjohansson.example.backendpetvet.repositories.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminService() {
    }

    // GET
    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }
    // POST
    public Admin postAdmin(Admin admin){
        return adminRepository.save(admin);
    }
    // DELETE

    // UPDATE
}

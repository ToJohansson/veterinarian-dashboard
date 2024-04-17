package tobiasjohansson.example.backendpetvet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tobiasjohansson.example.backendpetvet.models.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {
}

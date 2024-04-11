package tobiasjohansson.example.backendpetvet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tobiasjohansson.example.backendpetvet.models.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner,Integer> {
}

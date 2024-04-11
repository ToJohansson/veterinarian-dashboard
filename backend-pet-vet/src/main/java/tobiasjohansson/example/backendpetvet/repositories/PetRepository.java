package tobiasjohansson.example.backendpetvet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tobiasjohansson.example.backendpetvet.models.Pet;

@Repository
public interface PetRepository extends JpaRepository<Pet,Integer> {
}

package tobiasjohansson.example.backendpetvet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tobiasjohansson.example.backendpetvet.models.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}

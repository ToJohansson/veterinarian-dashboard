package tobiasjohansson.example.backendpetvet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "owners")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownerId;

    @Column(length = 100, nullable = false)
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    private Pet pet;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    public Owner () {}

    public Owner(int ownerId, String name, Pet pets, Address address) {
        this.ownerId = ownerId;
        this.name = name;
        this.pet = pets;
        this.address = address;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Pet getPets() {
        return pet;
    }

    public void setPets(Pet pets) {
        this.pet = pets;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}

package tobiasjohansson.example.backendpetvet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int petId;

    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private int age;


    public Pet() {
    }

    public Pet(int petId, String name, int age) {
        this.petId = petId;
        this.name = name;
        this.age = age;

    }

    public int getPetId() {
        return petId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}

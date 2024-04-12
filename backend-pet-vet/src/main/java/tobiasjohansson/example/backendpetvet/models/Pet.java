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

    private String comment;
    private String gender;

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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}

package tobiasjohansson.example.backendpetvet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addressId;

    @Column(length = 100, nullable = false)
    private String street;

    @Column(length = 100, nullable = false)
    private long phone;

    public Address() {
    }

    public Address(int addressId, String street, long phone) {
        this.addressId = addressId;
        this.street = street;
        this.phone = phone;
    }

    public int getAddressId() {
        return addressId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }
}

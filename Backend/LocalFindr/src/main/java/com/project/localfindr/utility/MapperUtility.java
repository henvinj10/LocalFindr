package com.project.localfindr.utility;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.model.Entities.*;
import com.project.localfindr.repository.AddressRepository;
import com.project.localfindr.repository.OfferingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapperUtility {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OfferingRepository offeringRepository;

    public RegisterEntity toRegisterEntity(RegisterDTO registerDTO) {
        if (registerDTO == null) {
            return null;
        }

        RegisterEntity registerEntity = new RegisterEntity();
        registerEntity.setEmail(registerDTO.getEmail());
        registerEntity.setUserType(registerDTO.getUserType());

        registerEntity.setAddressEntity(toAddressEntity(registerDTO.getAddress()));

        return registerEntity;
    }

    private AddressEntity toAddressEntity(Address address) {
        if (address == null){
            return null;
        }
        AddressEntity addressEntity = new AddressEntity();
        addressEntity.setBuildingInfo(address.getBuildingInfo());
        addressEntity.setStreetName(address.getStreetName());
        addressEntity.setLocalBody(address.getLocalBody());
        addressEntity.setCity(address.getCity());
        addressEntity.setDistrict(address.getDistrict());
        addressEntity.setState(address.getState());
        addressEntity.setCountry(address.getCountry());
        addressEntity.setGMap(address.getGmapLink());
        return addressEntity;
    }

    public ProfileDTO toProfileDto(ProfileEntity profileEntity) {
        if (profileEntity == null){
            return null;
        }
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setEmail(profileEntity.getEmail());
        profileDTO.setUserType(profileEntity.getUserType());
        profileDTO.setAddress(toAddressDTO(profileEntity.getProfileAddressEntity()));
        return profileDTO;
    }

    private Address toAddressDTO(ProfileAddressEntity profileAddressEntity) {
        if (profileAddressEntity == null){
            return null;
        }
        Address address = new Address();
        address.setBuildingInfo(profileAddressEntity.getBuildingInfo());
        address.setStreetName(profileAddressEntity.getStreetName());
        address.setLocalBody(profileAddressEntity.getLocalBody());
        address.setCity(profileAddressEntity.getCity());
        address.setDistrict(profileAddressEntity.getDistrict());
        address.setState(profileAddressEntity.getState());
        address.setCountry(profileAddressEntity.getCountry());
        address.setGmapLink(profileAddressEntity.getGMap());
        return address;
    }

    public UpdateProfileEntity toUpdateProfileEntity(Address address) {
        if (address == null){
            return null;
        }
        UpdateProfileEntity updateProfileEntity = new UpdateProfileEntity();
        updateProfileEntity.setBuildingInfo(address.getBuildingInfo());
        updateProfileEntity.setStreetName(address.getStreetName());
        updateProfileEntity.setLocalBody(address.getLocalBody());
        updateProfileEntity.setCity(address.getCity());
        updateProfileEntity.setDistrict(address.getDistrict());
        updateProfileEntity.setState(address.getState());
        updateProfileEntity.setCountry(address.getCountry());
        updateProfileEntity.setGMap(address.getGmapLink());
        return updateProfileEntity;
    }

    public List<SearchResponseDTO> toListSearchReponseDTO(List<OfferingEntity> availableOfferings) {
        return availableOfferings.stream()
                .map(offering -> {
                    SearchResponseDTO responseDTO = new SearchResponseDTO();
                    responseDTO.setOfferingID(Math.toIntExact(offering.getOfferingID()));
                    responseDTO.setName(offering.getOfferingName());
                    responseDTO.setType(offering.getOfferingType());
                    responseDTO.setCategory(offering.getCategory());
                    responseDTO.setDescription(offering.getDescription());
                    responseDTO.setPrice(offering.getPrice());
                    responseDTO.setImage(offering.getImage());
                    responseDTO.setAvailable(offering.isAvailable());
                    responseDTO.setAvailableTime(offering.getAvailableTime());

                    AddressEntity address = addressRepository.findByRegisterEntityEmail(offering.getEmail());
                    Address addressDTO = new Address();
                    addressDTO.setBuildingInfo(address.getBuildingInfo());
                    addressDTO.setStreetName(address.getStreetName());
                    addressDTO.setLocalBody(address.getLocalBody());
                    addressDTO.setCity(address.getCity());
                    addressDTO.setDistrict(address.getDistrict());
                    addressDTO.setState(address.getState());
                    addressDTO.setCountry(address.getCountry());
                    addressDTO.setGmapLink(address.getGMap());

                    responseDTO.setAddress(addressDTO);
                    return responseDTO;
                })
                .collect(Collectors.toList());
    }

    public List<WishlistResponseDTO> toListWishListResponseDTO(List<WishlistEntity> wishlistItems) {
       return wishlistItems.stream()
                .map(wishlistItem -> {
                    WishlistResponseDTO responseDTO = new WishlistResponseDTO();

                    // Fetch offering details based on offeringID from wishlist
                    OfferingEntity offeringEntity = offeringRepository.findById((long) wishlistItem.getOfferingID()).orElse(null);
                    if (offeringEntity != null) {
                        responseDTO.setOfferingID(Math.toIntExact(offeringEntity.getOfferingID()));
                        responseDTO.setName(offeringEntity.getOfferingName());
                        responseDTO.setType(offeringEntity.getOfferingType());
                        responseDTO.setCategory(offeringEntity.getCategory());
                        responseDTO.setDescription(offeringEntity.getDescription());
                        responseDTO.setPrice(offeringEntity.getPrice());
                        responseDTO.setImage(offeringEntity.getImage());
                        responseDTO.setAvailable(offeringEntity.isAvailable());
                        responseDTO.setAvailableTime(offeringEntity.getAvailableTime());

                        // Fetch address details associated with offering
                        AddressEntity addressEntity = addressRepository.findByRegisterEntityEmail(offeringEntity.getEmail());
                        if (addressEntity != null) {
                            Address address = new Address();
                            address.setBuildingInfo(addressEntity.getBuildingInfo());
                            address.setStreetName(addressEntity.getStreetName());
                            address.setLocalBody(addressEntity.getLocalBody());
                            address.setCity(addressEntity.getCity());
                            address.setDistrict(addressEntity.getDistrict());
                            address.setState(addressEntity.getState());
                            address.setCountry(addressEntity.getCountry());
                            address.setGmapLink(addressEntity.getGMap());

                            responseDTO.setAddress(address);
                        }
                    }

                    return responseDTO;
                })
                .collect(Collectors.toList());
    }


    public OfferingEntity toOfferingEntity(VendorDTO vendorDTO, String username) {

        if(vendorDTO == null)
        {
            return null;
        }
        OfferingEntity offeringEntity = new OfferingEntity();
        offeringEntity.setOfferingID((long) vendorDTO.getOfferingID());
        offeringEntity.setEmail(username);
        offeringEntity.setOfferingName(vendorDTO.getName());
        offeringEntity.setOfferingType(vendorDTO.getType());
        offeringEntity.setCategory(vendorDTO.getCategory());
        offeringEntity.setDescription(vendorDTO.getDescription());
        offeringEntity.setPrice(vendorDTO.getPrice());
        offeringEntity.setImage(vendorDTO.getImage());
        offeringEntity.setAvailable(vendorDTO.isAvailable());
        offeringEntity.setAvailableTime(vendorDTO.getAvailableTime());
        return offeringEntity;
    }

    public OfferingEntity toOfferingREntity(VendorRegisterDTO vendorRegisterDTO, String username) {

        if(vendorRegisterDTO == null)
        {
            return null;
        }
        OfferingEntity offeringEntity = new OfferingEntity();
        offeringEntity.setEmail(username);
        offeringEntity.setOfferingName(vendorRegisterDTO.getName());
        offeringEntity.setOfferingType(vendorRegisterDTO.getType());
        offeringEntity.setCategory(vendorRegisterDTO.getCategory());
        offeringEntity.setDescription(vendorRegisterDTO.getDescription());
        offeringEntity.setPrice(vendorRegisterDTO.getPrice());
        offeringEntity.setImage(vendorRegisterDTO.getImage());
        offeringEntity.setAvailable(vendorRegisterDTO.isAvailable());
        offeringEntity.setAvailableTime(vendorRegisterDTO.getAvailableTime());
        return offeringEntity;
    }

    public List<VendorDTO> toListVendorDTO(List<OfferingEntity> offerings) {
        return offerings.stream()
                .map(offering -> {
                    VendorDTO vendorDTO = new VendorDTO();
                    vendorDTO.setOfferingID(Math.toIntExact(offering.getOfferingID()));
                    vendorDTO.setName(offering.getOfferingName());
                    vendorDTO.setType(offering.getOfferingType());
                    vendorDTO.setCategory(offering.getCategory());
                    vendorDTO.setDescription(offering.getDescription());
                    vendorDTO.setImage(offering.getImage());
                    vendorDTO.setPrice(offering.getPrice());
                    vendorDTO.setAvailable(offering.isAvailable());
                    vendorDTO.setAvailableTime(offering.getAvailableTime());
                    return vendorDTO;
                })
                .collect(Collectors.toList());
    }
}

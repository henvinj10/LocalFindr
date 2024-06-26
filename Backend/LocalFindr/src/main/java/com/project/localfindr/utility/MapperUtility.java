package com.project.localfindr.utility;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.model.Entities.*;
import com.project.localfindr.repository.AddressRepository;
import com.project.localfindr.repository.OfferingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

        registerEntity.setAddressEntity(toAddressEntity(registerDTO.getAddressDTO()));

        return registerEntity;
    }

    private AddressEntity toAddressEntity(AddressDTO addressDTO) {
        if (addressDTO == null){
            return null;
        }
        AddressEntity addressEntity = new AddressEntity();
        addressEntity.setBuildingInfo(addressDTO.getBuildingInfo());
        addressEntity.setStreetName(addressDTO.getStreetName());
        addressEntity.setLocalBody(addressDTO.getLocalBody());
        addressEntity.setCity(addressDTO.getCity());
        addressEntity.setDistrict(addressDTO.getDistrict());
        addressEntity.setState(addressDTO.getState());
        addressEntity.setCountry(addressDTO.getCountry());
        addressEntity.setGMap(addressDTO.getGMapLink());
        return addressEntity;
    }

    public ProfileDTO toProfileDto(ProfileEntity profileEntity) {
        if (profileEntity == null){
            return null;
        }
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setEmail(profileEntity.getEmail());
        profileDTO.setUserType(profileEntity.getUserType());
        profileDTO.setAddressDTO(toAddressDTO(profileEntity.getProfileAddressEntity()));
        return profileDTO;
    }

    private AddressDTO toAddressDTO(ProfileAddressEntity profileAddressEntity) {
        if (profileAddressEntity == null){
            return null;
        }
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setBuildingInfo(profileAddressEntity.getBuildingInfo());
        addressDTO.setStreetName(profileAddressEntity.getStreetName());
        addressDTO.setLocalBody(profileAddressEntity.getLocalBody());
        addressDTO.setCity(profileAddressEntity.getCity());
        addressDTO.setDistrict(profileAddressEntity.getDistrict());
        addressDTO.setState(profileAddressEntity.getState());
        addressDTO.setCountry(profileAddressEntity.getCountry());
        addressDTO.setGMapLink(profileAddressEntity.getGMap());
        return addressDTO;
    }

    public UpdateProfileEntity toUpdateProfileEntity(AddressDTO addressDTO) {
        if (addressDTO == null){
            return null;
        }
        UpdateProfileEntity updateProfileEntity = new UpdateProfileEntity();
        updateProfileEntity.setBuildingInfo(addressDTO.getBuildingInfo());
        updateProfileEntity.setStreetName(addressDTO.getStreetName());
        updateProfileEntity.setLocalBody(addressDTO.getLocalBody());
        updateProfileEntity.setCity(addressDTO.getCity());
        updateProfileEntity.setDistrict(addressDTO.getDistrict());
        updateProfileEntity.setState(addressDTO.getState());
        updateProfileEntity.setCountry(addressDTO.getCountry());
        updateProfileEntity.setGMap(addressDTO.getGMapLink());
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
                    responseDTO.setIsAvailable(offering.isAvailable());
                    responseDTO.setAvailableTime(offering.getAvailableTime());

                    AddressEntity address = addressRepository.findByRegisterEntityEmail(offering.getEmail());
                    AddressDTO addressDTO = new AddressDTO();
                    addressDTO.setBuildingInfo(address.getBuildingInfo());
                    addressDTO.setStreetName(address.getStreetName());
                    addressDTO.setLocalBody(address.getLocalBody());
                    addressDTO.setCity(address.getCity());
                    addressDTO.setDistrict(address.getDistrict());
                    addressDTO.setState(address.getState());
                    addressDTO.setCountry(address.getCountry());
                    addressDTO.setGMapLink(address.getGMap());

                    responseDTO.setAddressDTO(addressDTO);
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
                        responseDTO.setIsAvailable(offeringEntity.isAvailable());
                        responseDTO.setAvailableTime(offeringEntity.getAvailableTime());

                        // Fetch address details associated with offering
                        AddressEntity addressEntity = addressRepository.findByRegisterEntityEmail(offeringEntity.getEmail());
                        if (addressEntity != null) {
                            AddressDTO addressDTO = new AddressDTO();
                            addressDTO.setBuildingInfo(addressEntity.getBuildingInfo());
                            addressDTO.setStreetName(addressEntity.getStreetName());
                            addressDTO.setLocalBody(addressEntity.getLocalBody());
                            addressDTO.setCity(addressEntity.getCity());
                            addressDTO.setDistrict(addressEntity.getDistrict());
                            addressDTO.setState(addressEntity.getState());
                            addressDTO.setCountry(addressEntity.getCountry());
                            addressDTO.setGMapLink(addressEntity.getGMap());

                            responseDTO.setAddressDTO(addressDTO);
                        }
                    }

                    return responseDTO;
                })
                .collect(Collectors.toList());
    }
}

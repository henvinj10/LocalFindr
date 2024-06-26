package com.project.localfindr.utility;

import com.project.localfindr.model.DTO.AddressDTO;
import com.project.localfindr.model.DTO.ProfileDTO;
import com.project.localfindr.model.DTO.RegisterDTO;
import com.project.localfindr.model.DTO.RegisterResponseDTO;
import com.project.localfindr.model.Entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class MapperUtility {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public RegisterEntity toRegisterEntity(RegisterDTO registerDTO) {
        if (registerDTO == null) {
            return null;
        }

        RegisterEntity registerEntity = new RegisterEntity();
        registerEntity.setEmail(registerDTO.getEmail());
        registerEntity.setUserPassword(passwordEncoder.encode(registerDTO.getPassword()));
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
}

package com.project.localfindr.utility;

import com.project.localfindr.model.DTO.AddressDTO;
import com.project.localfindr.model.DTO.RegisterDTO;
import com.project.localfindr.model.DTO.RegisterResponseDTO;
import com.project.localfindr.model.Entities.AddressEntity;
import com.project.localfindr.model.Entities.RegisterEntity;
import com.project.localfindr.model.Entities.RegisterResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    public RegisterResponseDTO toRegisterResponseDTO(RegisterResponseEntity registerResponseEntity) {
        if (registerResponseEntity == null){
            return null;
        }
        RegisterResponseDTO registerResponseDTO = new RegisterResponseDTO();
        registerResponseDTO.setMessage(registerResponseEntity.getMessage());
        return registerResponseDTO;
    }
}

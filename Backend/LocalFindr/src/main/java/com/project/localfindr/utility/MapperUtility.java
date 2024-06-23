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
        registerEntity.setUser_password(passwordEncoder.encode(registerDTO.getPassword()));
        registerEntity.setUser_type(registerDTO.getUserType());

        registerEntity.setAddressEntity(toAddressEntity(registerDTO.getAddressDTO()));

        return registerEntity;
    }

    private AddressEntity toAddressEntity(AddressDTO addressDTO) {
        if (addressDTO == null){
            return null;
        }
        AddressEntity addressEntity = new AddressEntity();
        addressEntity.setBuilding_info(addressDTO.getBuildingInfo());
        addressEntity.setStreet_name(addressDTO.getStreetName());
        addressEntity.setLocal_body(addressDTO.getLocalBody());
        addressEntity.setCity(addressDTO.getCity());
        addressEntity.setDistrict(addressDTO.getDistrict());
        addressEntity.setState(addressDTO.getState());
        addressEntity.setCountry(addressDTO.getCountry());
        addressEntity.setG_map(addressDTO.getGMapLink());
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

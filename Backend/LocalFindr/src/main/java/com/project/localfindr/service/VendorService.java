package com.project.localfindr.service;

import com.project.localfindr.model.DTO.VendorDTO;
import com.project.localfindr.model.DTO.VendorResponseDTO;
import com.project.localfindr.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorService {

    @Autowired
    VendorRepository vendorRepository;

    public VendorResponseDTO createItem(VendorDTO vendorDTO){
        //Add logic to get vendor username;
        String username = "sampleUsername";
        return vendorRepository.insertItem(vendorDTO);
    }

    public VendorResponseDTO modifyItem(VendorDTO vendorDTO){
        //Add logic to get vendor username;
        String username = "sampleUsername";
        return vendorRepository.updateItem(vendorDTO);
    }
    public VendorResponseDTO removeItem(String offeringId){
        //Add logic to get vendor username;
        String username = "sampleUsername";
        return vendorRepository.deleteItem(offeringId);
    }
    public VendorResponseDTO fetchItem(String offeringId){
        //Add logic to get vendor username;
        String username = "sampleUsername";
        return vendorRepository.getItem(offeringId);
    }
}

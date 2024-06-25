package com.project.localfindr.repository;

import com.project.localfindr.model.DTO.VendorDTO;
import com.project.localfindr.model.DTO.VendorResponseDTO;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository {

    VendorResponseDTO insertItem(VendorDTO vendorDTO);
    VendorResponseDTO updateItem(VendorDTO vendorDTO);
    VendorResponseDTO deleteItem(String offeringId);
    VendorResponseDTO getItem(String offeringId);

}

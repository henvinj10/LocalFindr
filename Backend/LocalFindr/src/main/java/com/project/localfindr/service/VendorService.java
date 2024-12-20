package com.project.localfindr.service;


import com.project.localfindr.model.DTO.VendorDTO;
import com.project.localfindr.model.DTO.VendorRegisterDTO;
import com.project.localfindr.model.DTO.VendorResponseDTO;
import com.project.localfindr.model.Entities.OfferingEntity;
import com.project.localfindr.repository.*;
import com.project.localfindr.utility.JwtUtil;
import com.project.localfindr.utility.MapperUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {

    @Autowired
    private VendorDataRepository vendorDataRepository;
    @Autowired
    private MapperUtility mapperUtility;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UpdateItemRepository updateItemRepository;
    @Autowired
    private RemoveItemRepository removeItemRepository;
    @Autowired
    private OfferingRepository offeringRepository;

    public VendorResponseDTO createItem(HttpServletRequest request, VendorRegisterDTO vendorRegisterDTO){
        OfferingEntity offeringEntity = mapperUtility.toOfferingREntity(vendorRegisterDTO,getEmail(request));
        offeringRepository.save(offeringEntity);
        VendorResponseDTO vendorResponseDTO = new VendorResponseDTO();
        vendorResponseDTO.setMessage("Item added");
        return vendorResponseDTO;
    }

    public VendorResponseDTO modifyItem(HttpServletRequest request, VendorDTO vendorDTO){
        OfferingEntity offeringEntity = mapperUtility.toOfferingEntity(vendorDTO,getEmail(request));
        updateItemRepository.updateItem(offeringEntity);
        VendorResponseDTO vendorResponseDTO = new VendorResponseDTO();
        vendorResponseDTO.setMessage("Item updated");
        return vendorResponseDTO;
    }
    public VendorResponseDTO removeItem(HttpServletRequest request, Integer offeringId){
         removeItemRepository.deleteItem(Long.valueOf(offeringId),getEmail(request));
        VendorResponseDTO vendorResponseDTO = new VendorResponseDTO();
        vendorResponseDTO.setMessage("Item updated");
        return vendorResponseDTO;
    }
    public List<VendorDTO> fetchItems(HttpServletRequest request) {

        return mapperUtility.toListVendorDTO(vendorDataRepository.findByEmail(getEmail(request)));
    }

    private String getEmail(HttpServletRequest request){
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return jwtUtil.getEmailFromToken(authorizationHeader.substring(7));
        }
        throw new NullPointerException("Header is null");
    }
}

package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendor")
public class VendorController {
    @Autowired
    private VendorService vendorService;

    @PostMapping("/create")
    public VendorResponseDTO addItem(@RequestBody VendorDTO vendorDTO) {
        return vendorService.createItem(vendorDTO);
    }

    @PutMapping("/update")
    public VendorResponseDTO updateItem(@RequestBody VendorDTO vendorDTO) {
        return vendorService.modifyItem(vendorDTO);
    }
    @DeleteMapping("/delete")
    public VendorResponseDTO deleteItem(@RequestBody String offeringId) {
        return vendorService.removeItem(offeringId);
    }
    @GetMapping("/{offeringId}")
    public VendorResponseDTO getItem(@RequestBody String offeringId) {//TODO: Need to handle path parameter
        return vendorService.fetchItem(offeringId);
    }
}

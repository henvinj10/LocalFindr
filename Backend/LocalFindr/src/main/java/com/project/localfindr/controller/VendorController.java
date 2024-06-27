package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.service.VendorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendor")
public class VendorController {
    @Autowired
    private VendorService vendorService;

    @PostMapping("/create")
    public VendorResponseDTO create(@RequestBody VendorRegisterDTO vendorRegisterDTO, HttpServletRequest request) {
        return vendorService.createItem(request, vendorRegisterDTO);
    }

    @PutMapping("/update")
    public VendorResponseDTO update(@RequestBody VendorDTO vendorDTO, HttpServletRequest request) {
        return vendorService.modifyItem(request, vendorDTO);
    }

    @DeleteMapping("/delete/{offeringId}")
    public VendorResponseDTO delete(@PathVariable Integer offeringId, HttpServletRequest request) {
        return vendorService.removeItem(request, offeringId);
    }

    @GetMapping("/all")
    public List<VendorDTO> getItems(HttpServletRequest request) {
        return vendorService.fetchItems(request);
    }
}
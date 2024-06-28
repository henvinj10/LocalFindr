package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.*;
import com.project.localfindr.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/search")
    public List<SearchResponseDTO> search(@RequestBody SearchDTO searchDTO, HttpServletRequest request) {
        return customerService.search(request, searchDTO);
    }

    @PostMapping("/save/{offeringID}")
    public SaveResponseDTO save(@PathVariable int offeringID, HttpServletRequest request){
        return customerService.save(offeringID, request);
    }

    @DeleteMapping("/delete/{offeringID}")
    public DeleteResponseDTO delete(@PathVariable int offeringID, HttpServletRequest request){
        return customerService.delete(offeringID, request);
    }

    @GetMapping("/wishlist")
    public List<WishlistResponseDTO> search(HttpServletRequest request) {
        return customerService.getWishlist(request);
    }

}

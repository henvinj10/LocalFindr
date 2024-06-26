package com.project.localfindr.controller;

import com.project.localfindr.model.DTO.SearchDTO;
import com.project.localfindr.model.DTO.SearchResponseDTO;
import com.project.localfindr.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/search")
    public List<SearchResponseDTO> search(@RequestBody SearchDTO searchDTO, HttpServletRequest request) {
        return customerService.search(request, searchDTO);
    }
}

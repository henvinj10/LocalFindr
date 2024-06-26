package com.project.localfindr.service;

import com.project.localfindr.model.DTO.AddressDTO;
import com.project.localfindr.model.DTO.SearchDTO;
import com.project.localfindr.model.DTO.SearchResponseDTO;
import com.project.localfindr.model.Entities.AddressEntity;
import com.project.localfindr.model.Entities.OfferingEntity;
import com.project.localfindr.repository.AddressRepository;
import com.project.localfindr.repository.OfferingRepository;
import com.project.localfindr.utility.MapperUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private OfferingRepository offeringRepository;

    @Autowired
    private MapperUtility mapperUtility;

    public List<SearchResponseDTO> search(HttpServletRequest request, SearchDTO searchDTO) {
        // Fetch data from the database based on search criteria
        List<OfferingEntity> offerings = offeringRepository.findByCriteria(
                searchDTO.getName(),
                searchDTO.getType(),
                searchDTO.getCategory(),
                searchDTO.getPrice(),
                searchDTO.getStreetName(),
                searchDTO.getLocalBody(),
                searchDTO.getCity()
        );

        // Filter the offerings to only include available ones
        List<OfferingEntity> availableOfferings = offerings.stream()
                .filter(OfferingEntity::isAvailable)
                .collect(Collectors.toList());

        // Map the offerings to SearchResponseDTO
        return mapperUtility.toListSearchReponseDTO(availableOfferings);
    }
}

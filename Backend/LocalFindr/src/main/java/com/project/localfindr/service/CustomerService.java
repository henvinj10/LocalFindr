package com.project.localfindr.service;

import com.project.localfindr.model.DTO.AddressDTO;
import com.project.localfindr.model.DTO.SaveResponseDTO;
import com.project.localfindr.model.DTO.SearchDTO;
import com.project.localfindr.model.DTO.SearchResponseDTO;
import com.project.localfindr.model.Entities.AddressEntity;
import com.project.localfindr.model.Entities.OfferingEntity;
import com.project.localfindr.model.Entities.WishlistEntity;
import com.project.localfindr.repository.AddressRepository;
import com.project.localfindr.repository.OfferingRepository;
import com.project.localfindr.repository.WishlistRepository;
import com.project.localfindr.utility.JwtUtil;
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

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private WishlistRepository wishlistRepository;

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

        // Map the offerings to SearchResponseDTO
        return mapperUtility.toListSearchReponseDTO(offerings);
    }

    public SaveResponseDTO save(int offeringID, HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");
        String jwt = null;
        String email = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            email = jwtUtil.getEmailFromToken(jwt);
            WishlistEntity wishlistEntity = new WishlistEntity();
            wishlistEntity.setOfferingID(offeringID);
            wishlistEntity.setEmail(email);
            WishlistEntity wishlistEntityCheck = wishlistRepository.save(wishlistEntity);
            if (wishlistEntityCheck != null){
                SaveResponseDTO saveResponseDTO = new SaveResponseDTO();
                saveResponseDTO.setMessage("Added to wishlist successfully");
            }
            throw new UnsupportedOperationException("Wishlist saving failed");
        }
        throw new NullPointerException("Header is null");
    }
}

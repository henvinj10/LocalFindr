package com.project.localfindr.service;

import com.project.localfindr.model.DTO.*;
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
import java.util.Optional;
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
        Double price = searchDTO.getPrice() == 0.0 ? null : searchDTO.getPrice();
        String name = (searchDTO.getName() != null && !searchDTO.getName().trim().isEmpty()) ? searchDTO.getName().trim().toLowerCase() : null;
        String category = (searchDTO.getCategory() != null && !searchDTO.getCategory().trim().isEmpty()) ? searchDTO.getCategory().trim().toLowerCase() : null;
        String streetName = (searchDTO.getStreetName() != null && !searchDTO.getStreetName().trim().isEmpty()) ? searchDTO.getStreetName().trim().toLowerCase() : null;
        String localBody = (searchDTO.getLocalBody() != null && !searchDTO.getLocalBody().trim().isEmpty()) ? searchDTO.getLocalBody().trim().toLowerCase() : null;
        String city = (searchDTO.getCity() != null && !searchDTO.getCity().trim().isEmpty()) ? searchDTO.getCity().trim().toLowerCase() : null;

        List<OfferingEntity> offerings = offeringRepository.findByCriteria(
                name,
                searchDTO.getType(),
                category,
                price,
                streetName,
                localBody,
                city
        );

        // Map the offerings to SearchResponseDTO
        return mapperUtility.toListSearchReponseDTO(offerings);
    }

    public SaveResponseDTO save(int offeringID, HttpServletRequest request) {

        Optional<WishlistEntity> existingItem = wishlistRepository.findByEmailAndOfferingID(
                getEmail(request), (long) offeringID);
        if (existingItem.isPresent()) {
            SaveResponseDTO saveResponseDTO = new SaveResponseDTO();
            saveResponseDTO.setMessage("Item Already in wishlist");
            return saveResponseDTO;
        }
        WishlistEntity wishlistEntity = new WishlistEntity();
        wishlistEntity.setOfferingID(offeringID);
        wishlistEntity.setEmail(getEmail(request));
        wishlistRepository.save(wishlistEntity);
        SaveResponseDTO saveResponseDTO = new SaveResponseDTO();
        saveResponseDTO.setMessage("Added to wishlist successfully");
        return saveResponseDTO;
    }

    public DeleteResponseDTO delete(int offeringID, HttpServletRequest request) {
        wishlistRepository.deleteByEmailAndOfferingId(getEmail(request), (long) offeringID);
        DeleteResponseDTO deleteResponseDTO = new DeleteResponseDTO();
        deleteResponseDTO.setMessage("Deleted from wishlist successfully");
        return deleteResponseDTO;
    }

    public List<WishlistResponseDTO> getWishlist(HttpServletRequest request) {
        String email =getEmail(request);
        List<WishlistEntity> wishlistItems = wishlistRepository.findByEmail(email);
        return mapperUtility.toListWishListResponseDTO(wishlistItems);
    }

    String getEmail(HttpServletRequest request){
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return jwtUtil.getEmailFromToken(authorizationHeader.substring(7));
        }
        throw new NullPointerException("Header is null");
    }


}

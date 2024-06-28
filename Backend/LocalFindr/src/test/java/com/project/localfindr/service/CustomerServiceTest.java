package com.project.localfindr.service;


import com.project.localfindr.enumeration.OfferingType;
import com.project.localfindr.enumeration.UserType;
import com.project.localfindr.model.DTO.*;
import com.project.localfindr.model.Entities.OfferingEntity;
import com.project.localfindr.model.Entities.WishlistEntity;
import com.project.localfindr.repository.OfferingRepository;
import com.project.localfindr.repository.WishlistRepository;
import com.project.localfindr.utility.JwtUtil;
import com.project.localfindr.utility.MapperUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private OfferingRepository offeringRepository;

    @Mock
    private MapperUtility mapperUtility;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private WishlistRepository wishlistRepository;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private CustomerService customerService;

    private SearchDTO searchDTO;
    private List<OfferingEntity> offerings;
    private String email;
    private WishlistEntity wishlistEntity;

    @BeforeEach
    void setUp() {
        searchDTO = new SearchDTO();
        searchDTO.setName("Test Name");
        searchDTO.setType(OfferingType.PRODUCT);
        searchDTO.setCategory("Test Category");
        searchDTO.setPrice(100.0);
        searchDTO.setStreetName("Test Street");
        searchDTO.setLocalBody("Test Local Body");
        searchDTO.setCity("Test City");

        offerings = Collections.singletonList(new OfferingEntity());

        email = "test@example.com";

        wishlistEntity = new WishlistEntity();
        wishlistEntity.setOfferingID(1);
        wishlistEntity.setEmail(email);
    }

    @Test
    void testSearch() {
        when(offeringRepository.findByCriteria(anyString(), OfferingType.valueOf(anyString()), anyString(), anyDouble(), anyString(), anyString(), anyString()))
                .thenReturn(offerings);
        when(mapperUtility.toListSearchReponseDTO(anyList())).thenReturn(Collections.singletonList(new SearchResponseDTO()));

        List<SearchResponseDTO> result = customerService.search(request, searchDTO);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(offeringRepository).findByCriteria(anyString(), OfferingType.valueOf(anyString()), anyString(), anyDouble(), anyString(), anyString(), anyString());
        verify(mapperUtility).toListSearchReponseDTO(anyList());
    }

    @Test
    void testSave_NewItem() {
        when(jwtUtil.getEmailFromToken(anyString())).thenReturn(email);
        when(wishlistRepository.findByEmailAndOfferingID(anyString(), anyLong())).thenReturn(Optional.empty());
        when(wishlistRepository.save(any(WishlistEntity.class))).thenReturn(wishlistEntity);

        SaveResponseDTO result = customerService.save(1, request);

        assertEquals("Added to wishlist successfully", result.getMessage());
        verify(wishlistRepository).findByEmailAndOfferingID(anyString(), anyLong());
        verify(wishlistRepository).save(any(WishlistEntity.class));
    }

    @Test
    void testSave_ExistingItem() {
        when(jwtUtil.getEmailFromToken(anyString())).thenReturn(email);
        when(wishlistRepository.findByEmailAndOfferingID(anyString(), anyLong())).thenReturn(Optional.of(wishlistEntity));

        SaveResponseDTO result = customerService.save(1, request);

        assertEquals("Item Already in wishlist", result.getMessage());
        verify(wishlistRepository).findByEmailAndOfferingID(anyString(), anyLong());
    }

    @Test
    void testDelete() {
        when(jwtUtil.getEmailFromToken(anyString())).thenReturn(email);

        DeleteResponseDTO result = customerService.delete(1, request);

        assertEquals("Deleted from wishlist successfully", result.getMessage());
        verify(wishlistRepository).deleteByEmailAndOfferingId(anyString(), anyLong());
    }

    @Test
    void testGetWishlist() {
        when(jwtUtil.getEmailFromToken(anyString())).thenReturn(email);
        when(wishlistRepository.findByEmail(anyString())).thenReturn(Collections.singletonList(wishlistEntity));
        when(mapperUtility.toListWishListResponseDTO(anyList())).thenReturn(Collections.singletonList(new WishlistResponseDTO()));

        List<WishlistResponseDTO> result = customerService.getWishlist(request);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(wishlistRepository).findByEmail(anyString());
        verify(mapperUtility).toListWishListResponseDTO(anyList());
    }

    @Test
    void testGetEmail() {
        when(request.getHeader("Authorization")).thenReturn("Bearer token");
        when(jwtUtil.getEmailFromToken(anyString())).thenReturn(email);

        String result = customerService.getEmail(request);

        assertEquals(email, result);
    }

    @Test
    void testGetEmail_HeaderNull() {
        when(request.getHeader("Authorization")).thenReturn(null);

        assertThrows(NullPointerException.class, () -> customerService.getEmail(request));
    }
}

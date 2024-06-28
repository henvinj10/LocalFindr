package com.project.localfindr.service;

import com.project.localfindr.model.DTO.VendorDTO;
import com.project.localfindr.model.DTO.VendorRegisterDTO;
import com.project.localfindr.model.DTO.VendorResponseDTO;
import com.project.localfindr.model.Entities.OfferingEntity;
import com.project.localfindr.repository.*;
import com.project.localfindr.utility.JwtUtil;
import com.project.localfindr.utility.MapperUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VendorServiceTest {

    @Mock
    private VendorDataRepository vendorDataRepository;

    @Mock
    private MapperUtility mapperUtility;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UpdateItemRepository updateItemRepository;

    @Mock
    private RemoveItemRepository removeItemRepository;

    @Mock
    private OfferingRepository offeringRepository;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private VendorService vendorService;

    private String jwtToken;
    private String email;

    @BeforeEach
    void setUp() {
        jwtToken = "dummyToken";
        email = "test@example.com";
    }

    @Test
    void testCreateItem() {
        VendorRegisterDTO registerDTO = new VendorRegisterDTO();
        OfferingEntity offeringEntity = new OfferingEntity();
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(mapperUtility.toOfferingREntity(eq(registerDTO), anyString())).thenReturn(offeringEntity);

        VendorResponseDTO responseDTO = vendorService.createItem(request, registerDTO);

        assertEquals("Item added", responseDTO.getMessage());
        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(mapperUtility).toOfferingREntity(registerDTO, email);
        verify(offeringRepository).save(offeringEntity);
    }

    @Test
    void testModifyItem() {
        VendorDTO vendorDTO = new VendorDTO();
        OfferingEntity offeringEntity = new OfferingEntity();
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(mapperUtility.toOfferingEntity(eq(vendorDTO), anyString())).thenReturn(offeringEntity);

        VendorResponseDTO responseDTO = vendorService.modifyItem(request, vendorDTO);

        assertEquals("Item updated", responseDTO.getMessage());
        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(mapperUtility).toOfferingEntity(vendorDTO, email);
        verify(updateItemRepository).updateItem(offeringEntity);
    }

    @Test
    void testRemoveItem() {
        Integer offeringId = 1;
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);

        VendorResponseDTO responseDTO = vendorService.removeItem(request, offeringId);

        assertEquals("Item updated", responseDTO.getMessage());
        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(removeItemRepository).deleteItem(Long.valueOf(offeringId), email);
    }

    @Test
    void testFetchItems_NoItemsFound() {
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtil.getEmailFromToken(jwtToken)).thenReturn(email);
        when(vendorDataRepository.findByEmail(email)).thenReturn(null);

        List<VendorDTO> result = vendorService.fetchItems(request);

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(request).getHeader("Authorization");
        verify(jwtUtil).getEmailFromToken(jwtToken);
        verify(vendorDataRepository).findByEmail(email);
        verifyNoMoreInteractions(mapperUtility);
    }
}

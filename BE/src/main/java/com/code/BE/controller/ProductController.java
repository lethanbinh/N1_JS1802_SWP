package com.code.BE.controller;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.SuccessMessage;
import com.code.BE.exception.ApplicationException;
import com.code.BE.exception.NotFoundException;
import com.code.BE.exception.ValidationException;
import com.code.BE.model.dto.request.ProductRequest;
import com.code.BE.model.dto.response.ApiResponse;
import com.code.BE.model.dto.response.ProductResponse;
import com.code.BE.service.internal.productService.ProductService;
import com.code.BE.service.internal.stallService.StallService;
import com.code.BE.util.CodeGeneratorUtil;
import com.code.BE.util.ValidatorUtil;
import com.code.BE.validator.ProductValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
@PreAuthorize(value = "hasAuthority('ROLE_STAFF')")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private StallService stallService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private ProductValidator productValidator;

    @Autowired
    private CodeGeneratorUtil codeGeneratorUtil;

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> findAll() throws Exception {
        ApiResponse<List<ProductResponse>> apiResponse = new ApiResponse<>();
        try {
            apiResponse.ok(productService.findAll());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> findById(@PathVariable int id) throws Exception {
        try {
            if (productService.findById(id) == null) {
                throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
            }
            ApiResponse<ProductResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(productService.findById(id));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/stallName/{stallName}")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> findByStallNameContaining(@PathVariable String stallName) throws Exception {
        try {
            ApiResponse<List<ProductResponse>> apiResponse = new ApiResponse<>();
            apiResponse.ok(productService.findByStallNameContaining(stallName));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/name/{name}")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> findByNameContaining(@PathVariable String name) throws Exception {
        try {
            ApiResponse<List<ProductResponse>> apiResponse = new ApiResponse<>();
            apiResponse.ok(productService.findByNameContaining(name));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PreAuthorize(value = "hasAuthority('ROLE_STAFF') or hasAuthority('ROLE_MANAGER')")
    @GetMapping(value = "/barcode/{barcode}")
    public ResponseEntity<ApiResponse<ProductResponse>> findByBarcode(@PathVariable String barcode) throws Exception {
        try {
            if (productService.findByBarcode(barcode) == null) {
                throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
            }
            ApiResponse<ProductResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(productService.findByBarcode(barcode));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<ProductResponse>> save(@Valid @RequestBody ProductRequest productRequest,
                                                             BindingResult bindingResult) throws Exception {
        ApiResponse<ProductResponse> apiResponse = new ApiResponse<>();
        try {
            String countryCode = "893";
            String manufacturerCode = codeGeneratorUtil.generateRandomManufacturerCode();
            String productCode = codeGeneratorUtil.generateRandomProductCode();

            productValidator.validate(productRequest, bindingResult);
            while (productService.findByCode(productCode) != null) {
                productCode = codeGeneratorUtil.generateRandomProductCode();
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            ProductResponse productResponse = productService.save(productRequest, countryCode, manufacturerCode, productCode);
            apiResponse.ok(productResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateById(@PathVariable int id
            , @Valid @RequestBody ProductRequest productRequest
            , BindingResult bindingResult) throws Exception {
        try {
            ProductResponse productResponse = productService.findById(id);
            if (productResponse == null) {
                throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
            }

            productValidator.validate(productRequest, bindingResult);
            if (bindingResult.hasErrors()) {
                Map<String, String> validationErrors = validatorUtil.toErrors(bindingResult.getFieldErrors());
                throw new ValidationException(validationErrors);
            }

            ApiResponse<ProductResponse> apiResponse = new ApiResponse<>();
            apiResponse.ok(productService.editById(id, productRequest));
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (ValidationException ex) {
            throw ex; // Rethrow ValidationException
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteById(@PathVariable int id) throws Exception {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        try {
            ProductResponse productResponse = productService.findById(id);
            if (productResponse == null) {
                throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
            }
            productService.deleteById(id);
            apiResponse.ok(SuccessMessage.DELETE_SUCCESS);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw ex; // Rethrow NotFoundException
        } catch (Exception ex) {
            throw new ApplicationException(ex.getMessage()); // Handle other exceptions
        }
    }
}

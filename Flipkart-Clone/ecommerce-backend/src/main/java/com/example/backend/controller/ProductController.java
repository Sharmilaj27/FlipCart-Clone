package com.example.backend.controller;

import com.example.backend.entity.Product;
import com.example.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/products")

@CrossOrigin("*")

public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    @PostMapping
    public Product saveProduct(
            @RequestBody Product product) {

        return productService.saveProduct(product);
    }
}
package com.example.backend.service;

import com.example.backend.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product saveProduct(Product product);

}
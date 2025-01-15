package com.keola.springboot.webflux.examen.services;

import com.keola.springboot.webflux.examen.dao.ProductoDao;
import com.keola.springboot.webflux.examen.models.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ProductoServiceImpl implements ProductoService{
    @Autowired
    private ProductoDao productoDao;

    @Override
    public Flux<Producto> findAll() {
        return productoDao.findAll();
    }
}

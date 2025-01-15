package com.keola.springboot.webflux.examen.services;

import com.keola.springboot.webflux.examen.models.Producto;
import reactor.core.publisher.Flux;

public interface ProductoService {
    public Flux<Producto> findAll();

}

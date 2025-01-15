package com.keola.springboot.webflux.examen.dao;

import com.keola.springboot.webflux.examen.models.Producto;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductoDao extends ReactiveCrudRepository<Producto, Long> {
}

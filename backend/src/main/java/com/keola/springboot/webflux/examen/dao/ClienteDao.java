package com.keola.springboot.webflux.examen.dao;

import com.keola.springboot.webflux.examen.models.Cliente;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface ClienteDao extends R2dbcRepository<Cliente, Long> {
}

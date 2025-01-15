package com.keola.springboot.webflux.examen.services;

import com.keola.springboot.webflux.examen.models.Cliente;
import reactor.core.publisher.Flux;

public interface ClienteService {
    public Flux<Cliente> findAll();
}

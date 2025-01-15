package com.keola.springboot.webflux.examen.services;

import com.keola.springboot.webflux.examen.documents.Pedido;
import com.keola.springboot.webflux.examen.dto.PedidoDtoIn;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PedidoService {
    public Flux<Pedido> findAll();
    public Mono<Pedido> findById(String id);
    public Mono<Pedido> save(PedidoDtoIn pedido);
    public Mono<Pedido> update(String id, PedidoDtoIn pedidoDtoIn);
    public Mono<Void> delete(String id) ;
}


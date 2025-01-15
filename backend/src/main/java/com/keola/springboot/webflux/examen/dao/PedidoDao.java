package com.keola.springboot.webflux.examen.dao;

import com.keola.springboot.webflux.examen.documents.Pedido;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface PedidoDao extends ReactiveMongoRepository<Pedido, String> {
}

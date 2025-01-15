package com.keola.springboot.webflux.examen.controllers;

import com.keola.springboot.webflux.examen.documents.Pedido;
import com.keola.springboot.webflux.examen.dto.PedidoDtoIn;
import com.keola.springboot.webflux.examen.services.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public Mono<ResponseEntity<Flux<Pedido>>> listar() {
        return Mono.just(ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(pedidoService.findAll()));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Pedido>> ver(@PathVariable String id) {
        return pedidoService.findById(id)
                .map(pedido -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(pedido))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<ResponseEntity<Pedido>> crear(@Valid @RequestBody PedidoDtoIn pedidoDtoIn) {
        return pedidoService.save(pedidoDtoIn)
                .map(savedPedido -> ResponseEntity.created(URI.create("/api/pedidos/".concat(savedPedido.getId()))).body(savedPedido));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Pedido>> editar(@PathVariable String id, @RequestBody PedidoDtoIn pedidoDtoIn) {
        return pedidoService.update(id, pedidoDtoIn)
                .map(ResponseEntity::ok)
                .onErrorResume(IllegalArgumentException.class, e -> Mono.just(ResponseEntity.badRequest().body(null)));

    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> eliminar(@PathVariable String id) {
        return pedidoService.delete(id).then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)))
                .defaultIfEmpty(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
    }
}


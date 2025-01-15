package com.keola.springboot.webflux.examen.services;

import com.keola.springboot.webflux.examen.models.Cliente;
import com.keola.springboot.webflux.examen.models.LineaDePedido;
import com.keola.springboot.webflux.examen.dao.ClienteDao;
import com.keola.springboot.webflux.examen.dao.PedidoDao;
import com.keola.springboot.webflux.examen.models.Producto;
import com.keola.springboot.webflux.examen.dao.ProductoDao;
import com.keola.springboot.webflux.examen.documents.Pedido;
import com.keola.springboot.webflux.examen.dto.LineaDePedidoDtoIn;
import com.keola.springboot.webflux.examen.dto.PedidoDtoIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoServiceImpl implements PedidoService {
    @Autowired
    private PedidoDao pedidoDao;
    @Autowired
    private ProductoDao productoDao;
    @Autowired
    private ClienteDao clienteDao;

    @Override
    public Mono<Pedido> save(PedidoDtoIn pedidoDtoIn) {
        Mono<Cliente> clienteMono = clienteDao.findById(pedidoDtoIn.getClienteId());

        Flux<Producto> productosFlux = productoDao.findAllById(
                pedidoDtoIn.getLineas().stream()
                        .map(LineaDePedidoDtoIn::getProductoId)
                        .collect(Collectors.toList())
        );

        return clienteMono.zipWith(productosFlux.collectList(), (cliente, productos) -> {
            // Crear el pedido con el cliente y las lineas de orden
            List<LineaDePedido> lineasOrden = pedidoDtoIn.getLineas().stream()
                    .map(lineaDto -> {
                        Producto producto = productos.stream()
                                .filter(p -> p.getId().equals(lineaDto.getProductoId()))
                                .findFirst()
                                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
                        return new LineaDePedido(producto, lineaDto.getCantidad());
                    })
                    .collect(Collectors.toList());

            // Calcular el total del pedido
            double total = lineasOrden.stream()
                    .mapToDouble(linea -> linea.getProducto().getPrecio() * linea.getCantidad())
                    .sum();

            Pedido pedido = new Pedido();
            pedido.setCliente(cliente);
            pedido.setLineas(lineasOrden);
            pedido.setTotal(total);

            return pedido;
        }).flatMap(pedidoDao::save);
    }

    @Override
    public Mono<Pedido> update(String id, PedidoDtoIn pedidoDtoIn) {
        return pedidoDao.findById(id)
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Pedido no encontrado")))
                .flatMap(existingPedido -> {
                    // Obtener cliente y productos para actualizar el pedido
                    Mono<Cliente> clienteMono = clienteDao.findById(pedidoDtoIn.getClienteId());
                    Flux<Producto> productosFlux = productoDao.findAllById(
                            pedidoDtoIn.getLineas().stream()
                                    .map(LineaDePedidoDtoIn::getProductoId)
                                    .collect(Collectors.toList())
                    );

                    return clienteMono.zipWith(productosFlux.collectList(), (cliente, productos) -> {
                        // Crear las nuevas líneas de pedido
                        List<LineaDePedido> lineasOrden = pedidoDtoIn.getLineas().stream()
                                .map(lineaDto -> {
                                    Producto producto = productos.stream()
                                            .filter(p -> p.getId().equals(lineaDto.getProductoId()))
                                            .findFirst()
                                            .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
                                    return new LineaDePedido(producto, lineaDto.getCantidad());
                                })
                                .collect(Collectors.toList());

                        // Calcular el nuevo total
                        double total = lineasOrden.stream()
                                .mapToDouble(linea -> linea.getProducto().getPrecio() * linea.getCantidad())
                                .sum();

                        // Actualizar los datos del pedido existente
                        existingPedido.setCliente(cliente);
                        existingPedido.setLineas(lineasOrden);
                        existingPedido.setTotal(total);

                        return existingPedido;
                    });
                })
                .flatMap(pedidoDao::save);
    }

    @Override
    public Flux<Pedido> findAll() {
        return pedidoDao.findAll();
    }

    @Override
    public Mono<Pedido> findById(String id) {
        return pedidoDao.findById(id);
    }

    @Override
    public Mono<Void> delete(String id) {
        return pedidoDao.deleteById(id);
    }

}

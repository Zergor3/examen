package com.keola.springboot.webflux.examen.dto;

import lombok.Data;

import java.util.List;

@Data
public class PedidoDtoIn {
    private Long clienteId;
    private List<LineaDePedidoDtoIn> lineas;
}


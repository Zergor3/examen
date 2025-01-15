package com.keola.springboot.webflux.examen.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LineaDePedido {
    private Producto producto;
    private Integer cantidad;
}

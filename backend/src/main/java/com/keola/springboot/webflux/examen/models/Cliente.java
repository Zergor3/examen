package com.keola.springboot.webflux.examen.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("clientes")
@Data
public class Cliente {
    @Id
    private Long id;
    private String nombre;
    private String direccion;
}

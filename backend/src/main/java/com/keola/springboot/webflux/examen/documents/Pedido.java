package com.keola.springboot.webflux.examen.documents;

import com.keola.springboot.webflux.examen.models.Cliente;
import com.keola.springboot.webflux.examen.models.LineaDePedido;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "pedidos")
@Data
public class Pedido {
    @Id
    private String id;
    private Cliente cliente;
    private List<LineaDePedido> lineas;
    private Double total;
}

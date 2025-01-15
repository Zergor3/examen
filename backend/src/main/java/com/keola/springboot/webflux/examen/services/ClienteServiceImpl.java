package com.keola.springboot.webflux.examen.services;

import com.keola.springboot.webflux.examen.dao.ClienteDao;
import com.keola.springboot.webflux.examen.models.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ClienteServiceImpl implements ClienteService{
    @Autowired
    private ClienteDao clienteDao;

    @Override
    public Flux<Cliente> findAll() {
        return clienteDao.findAll();
    }
}

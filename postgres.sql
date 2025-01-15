create table public.clientes
(
    id        bigint  not null
        constraint clientes_pk
            primary key,
    nombre    varchar not null,
    direccion varchar
);

comment on table public.clientes is 'tabla de clientes';

alter table public.clientes
    owner to postgres;

create table public.productos
(
    id     bigint  not null
        constraint productos_pk
            primary key,
    nombre varchar not null
        constraint productos_pk_2
            unique,
    precio numeric not null
);

comment on table public.productos is 'Tabla de productos';

alter table public.productos
    owner to postgres;

insert into public.clientes (id, nombre, direccion)
values  (1, 'Hector', 'Jiron Elm');

insert into public.productos (id, nombre, precio)
values  (1, 'Sofa', 55.5),
        (2, 'Mesa', 20),
        (3, 'Cama', 200);

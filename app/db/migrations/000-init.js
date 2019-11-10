'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(`   
    CREATE TABLE public.admins (
      id integer NOT NULL,
      username text NOT NULL,
      "passwordHash" text NOT NULL,
      tokens text[] DEFAULT ARRAY[]::text[],
      deleted boolean DEFAULT false
  );
  
  
  ALTER TABLE public.admins OWNER TO postgres; 
  
  CREATE SEQUENCE public.admins_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
  
  
  ALTER TABLE public.admins_id_seq OWNER TO postgres; 
  ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
  
  CREATE TABLE public.brands (
      id integer NOT NULL,
      name text NOT NULL,
      deleted boolean DEFAULT false
  );
  
  
  ALTER TABLE public.brands OWNER TO postgres;
   
  CREATE SEQUENCE public.brands_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
  
  
  ALTER TABLE public.brands_id_seq OWNER TO postgres;
   
  ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;
  
   
  CREATE TABLE public.orders (
      id integer NOT NULL,
      phone text NOT NULL,
      data json NOT NULL,
      cost integer NOT NULL,
      status text DEFAULT 'WAITING'::text NOT NULL,
      "createdAt" timestamp with time zone DEFAULT now() NOT NULL
  );
  
  
  ALTER TABLE public.orders OWNER TO postgres;
   
  CREATE SEQUENCE public.orders_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
  
  
  ALTER TABLE public.orders_id_seq OWNER TO postgres;
   
  ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
   
  CREATE TABLE public.products (
      id integer NOT NULL,
      name text NOT NULL,
      description text NOT NULL,
      apply text NOT NULL,
      price integer NOT NULL,
      "brandId" integer NOT NULL,
      "avatarUrl" text,
      deleted boolean DEFAULT false
  );
  
  
  ALTER TABLE public.products OWNER TO postgres;
   
  CREATE SEQUENCE public.products_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
  
  
  ALTER TABLE public.products_id_seq OWNER TO postgres;
   
  ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
  
   
  
  CREATE TABLE public.tags (
      id integer NOT NULL,
      name text NOT NULL,
      deleted boolean DEFAULT false
  );
  
  
  ALTER TABLE public.tags OWNER TO postgres;
   
  
  CREATE SEQUENCE public.tags_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
  
  
  ALTER TABLE public.tags_id_seq OWNER TO postgres;
   
  ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
  
   
  
  ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
  
   
  ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);
  
   
  ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
  
   
  
  ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
  
   
  ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
   
  
  ALTER TABLE ONLY public.admins
      ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
  
   
  
  ALTER TABLE ONLY public.brands
      ADD CONSTRAINT brands_pkey PRIMARY KEY (id);
   
  
  ALTER TABLE ONLY public.orders
      ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
   
  
  ALTER TABLE ONLY public.products
      ADD CONSTRAINT products_pkey PRIMARY KEY (id);
  
   
  ALTER TABLE ONLY public.tags
      ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
   
  
  CREATE INDEX admins_username_index ON public.admins USING btree (username) WHERE ((deleted = false) OR (deleted IS NULL));
  
   
  CREATE UNIQUE INDEX brands_unique_name ON public.brands USING btree (name) WHERE (deleted = false);
   
  CREATE UNIQUE INDEX orders_id_uindex ON public.orders USING btree (id);
   
  
  CREATE UNIQUE INDEX tags_unique_name ON public.tags USING btree (name) WHERE (deleted = false);
  
   
  ALTER TABLE ONLY public.products
      ADD CONSTRAINT products_brands_id_fk FOREIGN KEY ("brandId") REFERENCES public.brands(id);
  
   
  
    
    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`  
    `);
  }
};

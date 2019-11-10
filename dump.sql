--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Debian 11.4-1.pgdg90+1)
-- Dumped by pg_dump version 11.4 (Debian 11.4-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username text NOT NULL,
    "passwordHash" text NOT NULL,
    tokens text[] DEFAULT ARRAY[]::text[],
    deleted boolean DEFAULT false
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name text NOT NULL,
    deleted boolean DEFAULT false
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_id_seq OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    phone text NOT NULL,
    data json NOT NULL,
    cost integer NOT NULL,
    status text DEFAULT 'WAITING'::text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

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

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: tagProduct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tagProduct" (
    "tagId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."tagProduct" OWNER TO postgres;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text NOT NULL,
    deleted boolean DEFAULT false
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
000-init.js
20190721174036-indexes.js
20190725091715-product-ref.js
20190807192834-tagProduct-refs.js
20191022185839-order.js
20191027185839-create-Admin.js
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, "passwordHash", tokens, deleted) FROM stdin;
1	admin	b824ac85da9ca0197e921092c9edf504c502ad66b1c66a894002b39c49541525d2c82c18f193d1b5b28140184b65bf8e39c93e01d7c6693cc80ae728f4edf92d	{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoxNTcyMjEyNDQ1MjY4LCJpYXQiOjE1NzIyMTI0NDUsImV4cCI6MTU3NDgwNDQ0NX0.ORNUgNJYftMkoaQzNLo_m72FAkKFlrhstlzGdtYZYOg,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoxNTcyMjQwMjM1MDA0LCJpYXQiOjE1NzIyNDAyMzUsImV4cCI6MTU3NDgzMjIzNX0.3lZErrDha0wTOA7llSs8xVmz0NKI3KDPhELpZQ_wMpc,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoxNTcyMjQ4NjY0OTAzLCJpYXQiOjE1NzIyNDg2NjQsImV4cCI6MTU3NDg0MDY2NH0.iYbnnfjjeaWLnIlGAIaLj9ZQZxPSVW89yfypLETQ7B4,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoxNTcyMjUxNjI5OTYyLCJpYXQiOjE1NzIyNTE2MjksImV4cCI6MTU3NDg0MzYyOX0.vlw4aMiD9Rigx8BcQlxAhaAgp34pH0kc6Kt7ns8jrVo,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoxNTcyMjgyNTI0ODk3LCJpYXQiOjE1NzIyODI1MjQsImV4cCI6MTU3NDg3NDUyNH0.J9bBUZLCcnfWDMScIOQXSy91Cjawr-Htrug_wddb0Fo,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoxNTcyOTA0NTQ0Njg0LCJpYXQiOjE1NzI5MDQ1NDQsImV4cCI6MTU3NTQ5NjU0NH0.yPZYRMju5LQZKRR5ceVlb234maFtAvLMtEvFxXEUkjM}	f
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, deleted) FROM stdin;
1	Lador	f
2	Esthetic House	f
3	Elizavecca	f
4	ETUDE HOUSE	f
5	the SAEM	f
6	It`s Skin	f
7	SNP	f
8	Farm Stay	f
9	3W CLINIC	f
10	BERGAMO	f
11	Jigott	f
12	PETITFEE	f
13	Milatte	f
14	Tony Moly	f
15	SOME BY MI	f
16	Lebelage	f
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, phone, data, cost, status, "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, apply, price, "brandId", "avatarUrl", deleted) FROM stdin;
2	Keratin Power Glue Сыворотка для волос  15 мл.	 Сыворотка для секущихся кончиков  Экспресс-средство для склеивания посеченных кончиков волос. 	Способ применения: Как избавиться от секущихся кончиков?! После каждого мытья волос наносить небольшое кол-во средства на подсушенные полотенцем волосы. Расчесать аккуратно расческой с редкими зубцами. Не смывать! 	150	1	/images/products/2/products_2_a35c2149f4380c235636d26c168ada73.JPG	f
3	CP-1 Premium Silk Ampoule  Сыворотка для волос 20 мл.	Точная формула CP-1 Premium Silk Ampoule нацелена на восстановление ваших локонов изнутри	Способ применения: Наносить сыворотку следует уже после шампуня и кондиционера на сухие или полусухие волосы. Чтобы восстановить повреждённые волосы, используйте средство ежедневно, после — достаточно двух-трёх раз в неделю для профилактики.	220	2	/images/products/3/products_3_a49b7a7235c37b04d56111bda662bb55.JPG	f
4	Cp-1 Bright Complex Intense Nourishing Conditioner Протеиновый кондиционер для волос  100 мл	Протеиновый кондиционер Intense Nourishing Conditioner – изящное и качественное решение вечной проблемы ломкости и сухости волос.	Воспользуйтесь кондиционером уже после мытья головы шампунем. Выдавите немного кондиционера в руку и распределите по структуре волос от корней к кончикам короткими вспенивающими движениями. Тщательно промойте голову.	360	2	/images/products/4/products_4_f48d218a45d7b7a30c04878a56deda50.jpg	f
10	Baking Powder Pore Cleansing Foam Пенка для умывания 150 мл.	Пенка отличное дополнение к ежедневному уходу за кожей лица. 	Способ применения: 1. Смочите лицо теплой водой.  2. Слегка разотрите в ладони немного пенки, размером с 1 горошину.  3. Распределите продукт массирующими движениями по всей поверхности лица, включая глаза. Повторяйте действие до полного растворения макияжа.  4. Смойте остатки теплой водой. Теперь можно приступать к дальнейшим уходовым процедурам.  Для вспенивания средства целесообразнее будет воспользоваться специальной сеточкой для умывания, она создаст пышную и невесомую пену, которая эффективно очистит ваше лицо до скрипа.	850	4	/images/products/10/products_10_22fb7aebc2198e342d0d535f69e19d7a.JPG	f
8	Hell-Pore Vitamin Bright turn Peeling Gel Гель - пилинг с витаминами 150 мл.	Продукт обеспечивает деликатное очищение, при этом не травмируя чувствительную кожу. 	Выдавите небольшое количество геля на ладони и нанесите на предварительно увлажненную кожу лица. Круговыми движениями очистите кожу и смойте остатки средства прохладной водой.	920	3	/images/products/8/products_8_5207778a2e7c49cf43944e751f97479e.JPG	f
12	Have a Cleansing Foam Пенка для умывания  150 мл	Пенка придает и сохраняет эластичность кожи. Пенка очищает повседневные загрязнения, удаляет макияж.	Нанести на влажную кожу лица, аккуратно помассировать, затем смыть водой.	470	6	/images/products/12/products_12_5c1d28d5b592e4be583dc4cacb7d7b8e.JPG	f
5	Cp-1 Bright Complex Intense Nourishing Shampoo Протеиновый шампунь для волос  100 мл	Питательный шампунь предназначен для всех типов волос, но подойдёт в совершенстве обладательницам сухих, тусклых и лишённых объёма волос.	В зависимости от длины и необходимости, нажмите на дозатор, чтобы получить шампунь. Распределите пенящуюся жидкость от корней до кончиков волос лёгкими массирующими движениями. Обильно смойте средство тёплой водой	360	2	/images/products/5/products_5_2a47ff68b2295a35dd44d9efedaba7b7.jpg	f
6	Scalp Scaling Spa Ampoule Пилинг для кожи головы  200мл.	Пилинг для кожи головы подойдет как для решения проблем с быстро пачкающимися жирными волосами, так и для устранения сухости и перхоти/	Этот продукт важно распределить по коже головы так, чтобы он покрыл ее полностью, но при этом не втирать. Конечно, пилинг наносится на чистую кожу после мытья волос и небольшой сушки полотенцем. Средство нужно оставить на голове всего на пару минут, а потом вымыть водой без шампуня. Производитель рекомендует использовать ампулу 2 раза в неделю или по необходимости	880	1	/images/products/6/products_6_532583dcf74a90051fec4fe4162d00f8.JPG	f
7	 Milky Piggy Elastic Pore Cleansing Foam Пенка с древесным углем 120 мл.	Пенка прекрасно подходит для использования в качестве средства ежедневного ухода за лицом: как пенка для умывания и как эффективная маска для борьбы с несовершенствами кожи – черными точками, жирностью, прыщами.  	Небольшое количество средства взбить в густую пену, нанести на влажную кожу лица, помассировать, смыть. В качестве очищающей маски нанесите пенку на сухую чистую кожу на 4 мин., затем тщательно смыть.	800	3	/images/products/7/products_7_252950487909ab01c1325e96613e2829.JPG	f
9	 Baking Powder Crunch Pore Scrub Скраб в пакетиках 7 мл.	Средство содержит микрочастицы соды и мяты, которые отлично справляются с ороговевшим слоем кожи на лице, удаляют загрязнения и макияж, оставляя за собой чувство свежести и безупречной чистоты.	Всыпать порошок в ладони, разбавить его небольшим количеством воды и распределить по всей поверхности лица. Аккуратно массировать круговыми движениями, не травмируя кожу. В завершении смыть остатки теплой водой.	50	4	/images/products/9/products_9_1c5abfe35870bd2291fe9179eb14359f.JPG	f
1	 Perfect Hair Fill-Up Филлер для волос 13мл	Основанный на протеине, коллагене, керамидах и аминокислотах шелка, этот филлер для восстановления волос просто создан преображать сухие и тусклые локоны. 	Смешайте содержимое ампулы с холодной водой в пропорции 50/50 и хорошо перемешайте, пока средство не приобретет креомообразную консистенцию. Нанесите смесь на волосы и выдержите под шапочкой в течение 10-20 минут. Смывать средство нужно без шампуня, а для усиления и ускорения действия рекомендуется обеспечить волосам тепло при помощи фена или специальной термошапочки. Производитель рекомендует применять средство 2 раза в неделю или по необходимости.	150	1	/images/products/1/products_1_5242e78f3470fec83964291e66a73158.JPG	f
11	Natural Condition Cleansing Foam Очищающая пенка для умывания 150 мл.	Пенка-скраб для деликатного очищения кожи особенно рекомендуется для жирной, комбинированной и проблемной кожи.	Необходимо вспенить средство с помощью воды и нанести на лицо, после чего смыть водой.	550	5	/images/products/11/products_11_bee3d65900ecd27ff83ff9b1bb2f4275.JPG	f
\.


--
-- Data for Name: tagProduct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."tagProduct" ("tagId", "productId") FROM stdin;
6	12
9	12
7	9
1	1
10	1
1	2
1	3
2	3
3	6
8	6
2	4
3	4
2	5
3	5
4	5
6	10
9	10
6	7
6	8
11	8
7	11
6	11
9	11
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, name, deleted) FROM stdin;
1	волосы	f
2	CP-1	f
3	волосы 	f
4	шампунь 	f
5	скраб	f
6	пенка 	f
7	Скраб для лица	f
8	пилинг для кожи головы 	f
9	уход	f
10	филлер 	f
11	пилинг	f
\.


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 1, false);


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 16, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 12, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 11, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: admins_username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX admins_username_index ON public.admins USING btree (username) WHERE ((deleted = false) OR (deleted IS NULL));


--
-- Name: brands_unique_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX brands_unique_name ON public.brands USING btree (name) WHERE (deleted = false);


--
-- Name: orders_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX orders_id_uindex ON public.orders USING btree (id);


--
-- Name: tags_unique_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tags_unique_name ON public.tags USING btree (name) WHERE (deleted = false);


--
-- Name: products products_brands_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brands_id_fk FOREIGN KEY ("brandId") REFERENCES public.brands(id);


--
-- Name: tagProduct tagProduct_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tagProduct"
    ADD CONSTRAINT "tagProduct_products_id_fk" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- Name: tagProduct tagProduct_tags_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tagProduct"
    ADD CONSTRAINT "tagProduct_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES public.tags(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-1.pgdg20.10+1)
-- Dumped by pg_dump version 13.3 (Ubuntu 13.3-1.pgdg20.10+1)

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

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id bigint NOT NULL,
    comment character varying(255),
    created date,
    name character varying(255),
    mother_account_id bigint
);


--
-- Name: address; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.address (
    id bigint NOT NULL,
    comments character varying(255),
    complement character varying(255),
    local_name character varying(255),
    name character varying(255),
    number character varying(255),
    postal_code character varying(255),
    reference character varying(255),
    street character varying(255),
    neighborhood_id bigint,
    type_id bigint
);


--
-- Name: address_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.address_type (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255)
);


--
-- Name: card; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.card (
    id bigint NOT NULL,
    cnpj character varying(255),
    description character varying(255),
    favorite boolean NOT NULL,
    account_id bigint
);


--
-- Name: client_order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order (
    id bigint NOT NULL,
    comments character varying(255),
    forecast_change_to numeric(19,2),
    serve_date date,
    total numeric(19,2),
    clerk_id bigint,
    client_id bigint,
    forecast_payment_modality_id bigint
);


--
-- Name: client_order_deliveries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order_deliveries (
    client_order_id bigint NOT NULL,
    deliveries_id bigint NOT NULL
);


--
-- Name: client_order_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order_events (
    client_order_id bigint NOT NULL,
    events_id bigint NOT NULL
);


--
-- Name: client_order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order_items (
    client_order_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: client_order_modifiers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order_modifiers (
    client_order_id bigint NOT NULL,
    modifiers_id bigint NOT NULL
);


--
-- Name: client_order_payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order_payments (
    client_order_id bigint NOT NULL,
    payments_id bigint NOT NULL
);


--
-- Name: client_order_produced_products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_order_produced_products (
    client_order_id bigint NOT NULL,
    produced_products_id bigint NOT NULL
);


--
-- Name: contact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact (
    id bigint NOT NULL,
    contact character varying(255),
    name character varying(255),
    channel_id bigint
);


--
-- Name: contact_channel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact_channel (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255)
);


--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


--
-- Name: delivery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery (
    id bigint NOT NULL,
    comment character varying(255),
    date date,
    deliveryman_id bigint
);


--
-- Name: delivery_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_event (
    id bigint NOT NULL,
    comments character varying(255),
    datetime timestamp without time zone,
    status character varying(255)
);


--
-- Name: delivery_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_events (
    delivery_id bigint NOT NULL,
    events_id bigint NOT NULL
);


--
-- Name: delivery_order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_order (
    id bigint NOT NULL,
    calculated_delivery_time timestamp without time zone,
    delivery_price numeric(19,2),
    forecasted_delivery_time timestamp without time zone,
    index integer,
    requested_delivery_time timestamp without time zone,
    delivery_address_id bigint
);


--
-- Name: delivery_order_deliveries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_order_deliveries (
    delivery_order_id bigint NOT NULL,
    deliveries_id bigint NOT NULL
);


--
-- Name: delivery_order_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_order_event (
    id bigint NOT NULL,
    comments character varying(255),
    datetime timestamp without time zone,
    status character varying(255)
);


--
-- Name: delivery_order_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_order_events (
    delivery_order_id bigint NOT NULL,
    events_id bigint NOT NULL
);


--
-- Name: delivery_order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_order_items (
    delivery_order_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: delivery_order_to_delivery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_order_to_delivery (
    delivery_order_id bigint NOT NULL,
    to_delivery_id bigint NOT NULL
);


--
-- Name: delivery_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_orders (
    delivery_id bigint NOT NULL,
    orders_id bigint NOT NULL
);


--
-- Name: delivery_payment_by_neighborhood; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_payment_by_neighborhood (
    id bigint NOT NULL,
    price numeric(19,2),
    neighborhood_id bigint
);


--
-- Name: delivery_price_by_neighborhood; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_price_by_neighborhood (
    id bigint NOT NULL,
    date date,
    price numeric(19,2),
    neighborhood_id bigint
);


--
-- Name: deliveryman; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman (
    id bigint NOT NULL,
    salary_based_payment boolean NOT NULL,
    person_id bigint
);


--
-- Name: deliveryman_avaliable_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_avaliable_days (
    deliveryman_id bigint NOT NULL,
    avaliable_days integer
);


--
-- Name: deliveryman_contract; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_contract (
    id bigint NOT NULL,
    comments character varying(255),
    days_per_cycle integer,
    end_date date,
    fixed_payment_for_cycle numeric(19,2),
    minimum_cicle_payment numeric(19,2),
    payment_for_delivery numeric(19,2),
    start_date date
);


--
-- Name: deliveryman_contract_payment_for_delivery_by_neighborhood; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_contract_payment_for_delivery_by_neighborhood (
    deliveryman_contract_id bigint NOT NULL,
    payment_for_delivery_by_neighborhood_id bigint NOT NULL
);


--
-- Name: deliveryman_contracts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_contracts (
    deliveryman_id bigint NOT NULL,
    contracts_id bigint NOT NULL
);


--
-- Name: deliveryman_payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_payment (
    id bigint NOT NULL,
    transaction_id bigint
);


--
-- Name: deliveryman_payment_work_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_payment_work_days (
    deliveryman_payment_id bigint NOT NULL,
    work_days_id bigint NOT NULL
);


--
-- Name: deliveryman_payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_payments (
    deliveryman_id bigint NOT NULL,
    payments_id bigint NOT NULL
);


--
-- Name: deliveryman_work_day; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_work_day (
    id bigint NOT NULL,
    comment character varying(255),
    duration bigint,
    contract_id bigint
);


--
-- Name: deliveryman_work_day_deliveries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_work_day_deliveries (
    deliveryman_work_day_id bigint NOT NULL,
    deliveries_id bigint NOT NULL
);


--
-- Name: deliveryman_work_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveryman_work_days (
    deliveryman_id bigint NOT NULL,
    work_days_id bigint NOT NULL
);


--
-- Name: entry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entry (
    id bigint NOT NULL,
    balance numeric(25,10),
    comment character varying(255),
    value numeric(25,10),
    account_id bigint
);


--
-- Name: favorite_recipe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favorite_recipe (
    id bigint NOT NULL,
    comment character varying(255),
    output_id bigint,
    recipe_id bigint
);


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.feedback (
    id bigint NOT NULL,
    feedback character varying(255),
    made timestamp without time zone,
    contact_id bigint,
    order_id bigint
);


--
-- Name: functionary_avaliable_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_avaliable_days (
    functionary_id bigint NOT NULL,
    avaliable_days integer
);


--
-- Name: functionary_contract; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_contract (
    id bigint NOT NULL,
    comment character varying(255),
    end_date date,
    hour_salary numeric(19,2),
    month_salary numeric(19,2),
    start_date date,
    functionary_id bigint
);


--
-- Name: functionary_contract_functions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_contract_functions (
    functionary_contract_id bigint NOT NULL,
    functions_id bigint NOT NULL
);


--
-- Name: functionary_contract_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_contract_template (
    id bigint NOT NULL,
    comment character varying(255),
    date date,
    hour_salary numeric(25,10),
    month_salary numeric(25,10),
    function_id bigint
);


--
-- Name: functionary_function; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_function (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255)
);


--
-- Name: functionary_payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_payment (
    id bigint NOT NULL,
    functionary_id bigint,
    transaction_id bigint
);


--
-- Name: functionary_payment_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_payment_days (
    functionary_payment_id bigint NOT NULL,
    days_id bigint NOT NULL
);


--
-- Name: functionary_work_day; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_work_day (
    id bigint NOT NULL,
    comment character varying(255),
    duration bigint,
    functionary_id bigint,
    work_contract_id bigint
);


--
-- Name: functionary_working_time; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionary_working_time (
    id bigint NOT NULL,
    comment character varying(255),
    minutes integer,
    functionary_function_id bigint
);


--
-- Name: generic_transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.generic_transaction (
    id bigint NOT NULL,
    date timestamp without time zone,
    description character varying(255),
    modality_id bigint,
    voucher_id bigint
);


--
-- Name: generic_transaction_entries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.generic_transaction_entries (
    generic_transaction_id bigint NOT NULL,
    entries_id bigint NOT NULL
);


--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ingredient_replacement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingredient_replacement (
    id bigint NOT NULL,
    ratio numeric(25,10),
    input_id bigint,
    unit_id bigint NOT NULL
);


--
-- Name: input; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.input (
    id bigint NOT NULL,
    comment character varying(255),
    name character varying(255),
    favorite_id bigint
);


--
-- Name: input_converters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.input_converters (
    input_id bigint NOT NULL,
    converters_id bigint NOT NULL
);


--
-- Name: input_equivalence; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.input_equivalence (
    id bigint NOT NULL,
    ratio numeric(19,2),
    inputa_id bigint,
    inputb_id bigint,
    unita_id bigint NOT NULL,
    unitb_id bigint NOT NULL
);


--
-- Name: input_price; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.input_price (
    id bigint NOT NULL,
    date date,
    price_per_unit numeric(25,10),
    unit_id bigint
);


--
-- Name: input_prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.input_prices (
    input_id bigint NOT NULL,
    prices_id bigint NOT NULL
);


--
-- Name: input_unit_converter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.input_unit_converter (
    id bigint NOT NULL,
    ratio numeric(25,10),
    unita_id bigint NOT NULL,
    unitb_id bigint NOT NULL
);


--
-- Name: instruction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.instruction (
    id bigint NOT NULL,
    index integer,
    text character varying(255)
);


--
-- Name: item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.item (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    comment character varying(255),
    quantity numeric(25,10),
    index integer,
    show_with_ingredients boolean,
    calculated_balance numeric(25,10),
    checked_balance numeric(25,10),
    date timestamp without time zone,
    input_id bigint,
    unit_id bigint,
    recipe_id bigint
);


--
-- Name: item_replacements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.item_replacements (
    ingredient_id bigint NOT NULL,
    replacements_id bigint NOT NULL
);


--
-- Name: menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu (
    id bigint NOT NULL,
    comments character varying(255),
    title character varying(255)
);


--
-- Name: menu_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_item (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    comments character varying(255),
    index integer,
    title character varying(255),
    product_id bigint
);


--
-- Name: menu_item_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_item_items (
    menu_section_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_items (
    menu_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: neighborhood; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.neighborhood (
    id bigint NOT NULL,
    city character varying(255),
    name character varying(255),
    state character varying(255)
);


--
-- Name: nfce; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nfce (
    id bigint NOT NULL,
    access_code character varying(255),
    xml_id bigint
);


--
-- Name: nfce_xml; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nfce_xml (
    id bigint NOT NULL,
    xml bytea
);


--
-- Name: order_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_event (
    id bigint NOT NULL,
    comments character varying(255),
    datetime timestamp without time zone,
    status character varying(255)
);


--
-- Name: order_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item (
    id bigint NOT NULL,
    comments character varying(255),
    quantity numeric(19,2),
    subtotal numeric(19,2),
    product_id bigint
);


--
-- Name: order_item_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item_event (
    id bigint NOT NULL,
    comments character varying(255),
    datetime timestamp without time zone,
    status character varying(255)
);


--
-- Name: order_item_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item_events (
    order_item_id bigint NOT NULL,
    events_id bigint NOT NULL
);


--
-- Name: order_item_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item_items (
    order_item_group_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: order_item_movements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item_movements (
    order_item_id bigint NOT NULL,
    movements_id bigint NOT NULL
);


--
-- Name: order_item_sub_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item_sub_items (
    order_item_id bigint NOT NULL,
    sub_items_id bigint NOT NULL
);


--
-- Name: order_price_modifier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_price_modifier (
    id bigint NOT NULL,
    description character varying(255),
    percentage boolean NOT NULL,
    quantity numeric(19,2)
);


--
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    comment character varying(255),
    name character varying(255),
    account_id bigint,
    primary_address_id bigint,
    primary_contact_id bigint
);


--
-- Name: person_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person_addresses (
    person_id bigint NOT NULL,
    addresses_id bigint NOT NULL
);


--
-- Name: person_contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person_contacts (
    person_id bigint NOT NULL,
    contacts_id bigint NOT NULL
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    id bigint NOT NULL,
    comments character varying(255),
    name character varying(255),
    version date
);


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_categories (
    product_id bigint NOT NULL,
    categories_id bigint NOT NULL
);


--
-- Name: product_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_category (
    id bigint NOT NULL,
    name character varying(255)
);


--
-- Name: product_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_items (
    product_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: product_price; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_price (
    id bigint NOT NULL,
    date date,
    price numeric(19,2)
);


--
-- Name: product_prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_prices (
    product_id bigint NOT NULL,
    prices_id bigint NOT NULL
);


--
-- Name: product_recipe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_recipe (
    id bigint NOT NULL,
    output_id bigint,
    recipe_id bigint
);


--
-- Name: products_harmonization; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_harmonization (
    id bigint NOT NULL,
    comment character varying(255),
    a_id bigint,
    b_id bigint
);


--
-- Name: provider; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.provider (
    id bigint NOT NULL,
    cnpj character varying(255),
    comment character varying(255),
    name character varying(255)
);


--
-- Name: pruduced_product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pruduced_product (
    id bigint NOT NULL,
    comment character varying(255),
    produced timestamp without time zone
);


--
-- Name: pruduced_product_movements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pruduced_product_movements (
    pruduced_product_id bigint NOT NULL,
    movements_id bigint NOT NULL
);


--
-- Name: purchase; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase (
    id bigint NOT NULL,
    additional_value numeric(25,10),
    nfce_id bigint,
    provider_id bigint,
    transaction_id bigint
);


--
-- Name: purchase_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase_item (
    id bigint NOT NULL,
    applied boolean,
    avg_price numeric(25,10),
    brand character varying(255),
    declared_input character varying(255),
    declared_unit character varying(255),
    price_per_unit numeric(25,10),
    inventory_movement_id bigint
);


--
-- Name: purchase_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase_items (
    purchase_id bigint NOT NULL,
    items_id bigint NOT NULL
);


--
-- Name: purchase_product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase_product (
    id bigint NOT NULL,
    applied boolean,
    brand character varying(255),
    declared_input character varying(255),
    declared_unit character varying(255),
    keep_unit boolean NOT NULL,
    ratio numeric(25,10),
    input_id bigint,
    unit_id bigint
);


--
-- Name: recipe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe (
    id bigint NOT NULL,
    comment character varying(255),
    revision date,
    title character varying(255),
    total_time integer,
    version character varying(255)
);


--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_ingredients (
    recipe_id bigint NOT NULL,
    ingredients_id bigint NOT NULL
);


--
-- Name: recipe_instructions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_instructions (
    recipe_id bigint NOT NULL,
    instructions_id bigint NOT NULL
);


--
-- Name: recipe_outputs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_outputs (
    recipe_id bigint NOT NULL,
    outputs_id bigint NOT NULL
);


--
-- Name: recipe_works; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_works (
    recipe_id bigint NOT NULL,
    works_id bigint NOT NULL
);


--
-- Name: sales_prospect; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sales_prospect (
    id bigint NOT NULL,
    period bytea
);


--
-- Name: sales_prospect_prospected; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sales_prospect_prospected (
    sales_prospect_id bigint NOT NULL,
    prospected_id bigint NOT NULL
);


--
-- Name: transaction_modality; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction_modality (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255),
    favorite_id bigint
);


--
-- Name: transaction_voucher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction_voucher (
    id bigint NOT NULL,
    content_type character varying(255),
    file_extension character varying(255),
    voucher bytea
);


--
-- Name: unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.unit (
    id bigint NOT NULL,
    name character varying(255),
    pluralized_name character varying(255),
    symbol character varying(255) NOT NULL,
    quantity_id bigint
);


--
-- Name: unit_converter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.unit_converter (
    id bigint NOT NULL,
    ratio numeric(25,10),
    unita_id bigint NOT NULL,
    unitb_id bigint NOT NULL
);


--
-- Name: unit_quantity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.unit_quantity (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    favorite_id bigint
);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.account (id, comment, created, name, mother_account_id) FROM stdin;
28	\N	2021-06-15	Compras	\N
29	\N	2021-06-15	Caixa	\N
30	\N	2021-06-15	Pedidos	\N
31	\N	2021-06-15	Desconhecida	\N
\.


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.address (id, comments, complement, local_name, name, number, postal_code, reference, street, neighborhood_id, type_id) FROM stdin;
\.


--
-- Data for Name: address_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.address_type (id, description, name) FROM stdin;
41	\N	Casa
42	\N	Apartamento
\.


--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.card (id, cnpj, description, favorite, account_id) FROM stdin;
\.


--
-- Data for Name: client_order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order (id, comments, forecast_change_to, serve_date, total, clerk_id, client_id, forecast_payment_modality_id) FROM stdin;
\.


--
-- Data for Name: client_order_deliveries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order_deliveries (client_order_id, deliveries_id) FROM stdin;
\.


--
-- Data for Name: client_order_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order_events (client_order_id, events_id) FROM stdin;
\.


--
-- Data for Name: client_order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order_items (client_order_id, items_id) FROM stdin;
\.


--
-- Data for Name: client_order_modifiers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order_modifiers (client_order_id, modifiers_id) FROM stdin;
\.


--
-- Data for Name: client_order_payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order_payments (client_order_id, payments_id) FROM stdin;
\.


--
-- Data for Name: client_order_produced_products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.client_order_produced_products (client_order_id, produced_products_id) FROM stdin;
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contact (id, contact, name, channel_id) FROM stdin;
\.


--
-- Data for Name: contact_channel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contact_channel (id, description, name) FROM stdin;
43	\N	WhatsApp
44	\N	Instagram
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Data for Name: delivery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery (id, comment, date, deliveryman_id) FROM stdin;
\.


--
-- Data for Name: delivery_event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_event (id, comments, datetime, status) FROM stdin;
\.


--
-- Data for Name: delivery_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_events (delivery_id, events_id) FROM stdin;
\.


--
-- Data for Name: delivery_order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_order (id, calculated_delivery_time, delivery_price, forecasted_delivery_time, index, requested_delivery_time, delivery_address_id) FROM stdin;
\.


--
-- Data for Name: delivery_order_deliveries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_order_deliveries (delivery_order_id, deliveries_id) FROM stdin;
\.


--
-- Data for Name: delivery_order_event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_order_event (id, comments, datetime, status) FROM stdin;
\.


--
-- Data for Name: delivery_order_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_order_events (delivery_order_id, events_id) FROM stdin;
\.


--
-- Data for Name: delivery_order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_order_items (delivery_order_id, items_id) FROM stdin;
\.


--
-- Data for Name: delivery_order_to_delivery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_order_to_delivery (delivery_order_id, to_delivery_id) FROM stdin;
\.


--
-- Data for Name: delivery_orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_orders (delivery_id, orders_id) FROM stdin;
\.


--
-- Data for Name: delivery_payment_by_neighborhood; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_payment_by_neighborhood (id, price, neighborhood_id) FROM stdin;
\.


--
-- Data for Name: delivery_price_by_neighborhood; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_price_by_neighborhood (id, date, price, neighborhood_id) FROM stdin;
\.


--
-- Data for Name: deliveryman; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman (id, salary_based_payment, person_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_avaliable_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_avaliable_days (deliveryman_id, avaliable_days) FROM stdin;
\.


--
-- Data for Name: deliveryman_contract; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_contract (id, comments, days_per_cycle, end_date, fixed_payment_for_cycle, minimum_cicle_payment, payment_for_delivery, start_date) FROM stdin;
\.


--
-- Data for Name: deliveryman_contract_payment_for_delivery_by_neighborhood; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_contract_payment_for_delivery_by_neighborhood (deliveryman_contract_id, payment_for_delivery_by_neighborhood_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_contracts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_contracts (deliveryman_id, contracts_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_payment (id, transaction_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_payment_work_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_payment_work_days (deliveryman_payment_id, work_days_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_payments (deliveryman_id, payments_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_work_day; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_work_day (id, comment, duration, contract_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_work_day_deliveries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_work_day_deliveries (deliveryman_work_day_id, deliveries_id) FROM stdin;
\.


--
-- Data for Name: deliveryman_work_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveryman_work_days (deliveryman_id, work_days_id) FROM stdin;
\.


--
-- Data for Name: entry; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.entry (id, balance, comment, value, account_id) FROM stdin;
\.


--
-- Data for Name: favorite_recipe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.favorite_recipe (id, comment, output_id, recipe_id) FROM stdin;
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.feedback (id, feedback, made, contact_id, order_id) FROM stdin;
\.


--
-- Data for Name: functionary_avaliable_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_avaliable_days (functionary_id, avaliable_days) FROM stdin;
\.


--
-- Data for Name: functionary_contract; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_contract (id, comment, end_date, hour_salary, month_salary, start_date, functionary_id) FROM stdin;
\.


--
-- Data for Name: functionary_contract_functions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_contract_functions (functionary_contract_id, functions_id) FROM stdin;
\.


--
-- Data for Name: functionary_contract_template; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_contract_template (id, comment, date, hour_salary, month_salary, function_id) FROM stdin;
\.


--
-- Data for Name: functionary_function; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_function (id, description, name) FROM stdin;
\.


--
-- Data for Name: functionary_payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_payment (id, functionary_id, transaction_id) FROM stdin;
\.


--
-- Data for Name: functionary_payment_days; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_payment_days (functionary_payment_id, days_id) FROM stdin;
\.


--
-- Data for Name: functionary_work_day; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_work_day (id, comment, duration, functionary_id, work_contract_id) FROM stdin;
\.


--
-- Data for Name: functionary_working_time; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionary_working_time (id, comment, minutes, functionary_function_id) FROM stdin;
\.


--
-- Data for Name: generic_transaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.generic_transaction (id, date, description, modality_id, voucher_id) FROM stdin;
\.


--
-- Data for Name: generic_transaction_entries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.generic_transaction_entries (generic_transaction_id, entries_id) FROM stdin;
\.


--
-- Data for Name: ingredient_replacement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ingredient_replacement (id, ratio, input_id, unit_id) FROM stdin;
\.


--
-- Data for Name: input; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.input (id, comment, name, favorite_id) FROM stdin;
11	\N	Tomate	\N
12	\N	Cebola	\N
13	\N	Farinha de trigo	\N
14	\N	Desconhecido	\N
15	\N	Ovo	\N
16	\N	Manteiga	\N
17	\N	Sal	\N
18	\N	Ovo frito	\N
19	\N	Gás de cozinha	\N
20	\N	Queijo coaho	\N
21	\N	Queijo assado	\N
22	\N	Manjericão	\N
23	\N	Presunto de Parma	\N
24	\N	Queijo Gorgonzola	\N
25	\N	Queijo Parmesão	\N
26	\N	Queijo Provole	\N
27	\N	Azeite de Oliva	\N
\.


--
-- Data for Name: input_converters; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.input_converters (input_id, converters_id) FROM stdin;
\.


--
-- Data for Name: input_equivalence; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.input_equivalence (id, ratio, inputa_id, inputb_id, unita_id, unitb_id) FROM stdin;
\.


--
-- Data for Name: input_price; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.input_price (id, date, price_per_unit, unit_id) FROM stdin;
\.


--
-- Data for Name: input_prices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.input_prices (input_id, prices_id) FROM stdin;
\.


--
-- Data for Name: input_unit_converter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.input_unit_converter (id, ratio, unita_id, unitb_id) FROM stdin;
\.


--
-- Data for Name: instruction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.instruction (id, index, text) FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.item (dtype, id, comment, quantity, index, show_with_ingredients, calculated_balance, checked_balance, date, input_id, unit_id, recipe_id) FROM stdin;
\.


--
-- Data for Name: item_replacements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.item_replacements (ingredient_id, replacements_id) FROM stdin;
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menu (id, comments, title) FROM stdin;
\.


--
-- Data for Name: menu_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menu_item (dtype, id, comments, index, title, product_id) FROM stdin;
\.


--
-- Data for Name: menu_item_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menu_item_items (menu_section_id, items_id) FROM stdin;
\.


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menu_items (menu_id, items_id) FROM stdin;
\.


--
-- Data for Name: neighborhood; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.neighborhood (id, city, name, state) FROM stdin;
45	Garanhuns	Heliópolis	PE
46	Garanhuns	Severiano Moraes Filho	PE
47	Garanhuns	COHAB 1	PE
48	Garanhuns	COHAB 2	PE
49	Garanhuns	Parque Fênix	PE
\.


--
-- Data for Name: nfce; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.nfce (id, access_code, xml_id) FROM stdin;
\.


--
-- Data for Name: nfce_xml; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.nfce_xml (id, xml) FROM stdin;
\.


--
-- Data for Name: order_event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_event (id, comments, datetime, status) FROM stdin;
\.


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item (id, comments, quantity, subtotal, product_id) FROM stdin;
\.


--
-- Data for Name: order_item_event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item_event (id, comments, datetime, status) FROM stdin;
\.


--
-- Data for Name: order_item_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item_events (order_item_id, events_id) FROM stdin;
\.


--
-- Data for Name: order_item_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item_items (order_item_group_id, items_id) FROM stdin;
\.


--
-- Data for Name: order_item_movements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item_movements (order_item_id, movements_id) FROM stdin;
\.


--
-- Data for Name: order_item_sub_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item_sub_items (order_item_id, sub_items_id) FROM stdin;
\.


--
-- Data for Name: order_price_modifier; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_price_modifier (id, description, percentage, quantity) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.person (dtype, id, comment, name, account_id, primary_address_id, primary_contact_id) FROM stdin;
\.


--
-- Data for Name: person_addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.person_addresses (person_id, addresses_id) FROM stdin;
\.


--
-- Data for Name: person_contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.person_contacts (person_id, contacts_id) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product (id, comments, name, version) FROM stdin;
\.


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_categories (product_id, categories_id) FROM stdin;
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_category (id, name) FROM stdin;
39	pizza
40	massas
\.


--
-- Data for Name: product_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_items (product_id, items_id) FROM stdin;
\.


--
-- Data for Name: product_price; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_price (id, date, price) FROM stdin;
\.


--
-- Data for Name: product_prices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_prices (product_id, prices_id) FROM stdin;
\.


--
-- Data for Name: product_recipe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_recipe (id, output_id, recipe_id) FROM stdin;
\.


--
-- Data for Name: products_harmonization; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_harmonization (id, comment, a_id, b_id) FROM stdin;
\.


--
-- Data for Name: provider; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.provider (id, cnpj, comment, name) FROM stdin;
\.


--
-- Data for Name: pruduced_product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pruduced_product (id, comment, produced) FROM stdin;
\.


--
-- Data for Name: pruduced_product_movements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pruduced_product_movements (pruduced_product_id, movements_id) FROM stdin;
\.


--
-- Data for Name: purchase; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.purchase (id, additional_value, nfce_id, provider_id, transaction_id) FROM stdin;
\.


--
-- Data for Name: purchase_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.purchase_item (id, applied, avg_price, brand, declared_input, declared_unit, price_per_unit, inventory_movement_id) FROM stdin;
\.


--
-- Data for Name: purchase_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.purchase_items (purchase_id, items_id) FROM stdin;
\.


--
-- Data for Name: purchase_product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.purchase_product (id, applied, brand, declared_input, declared_unit, keep_unit, ratio, input_id, unit_id) FROM stdin;
\.


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe (id, comment, revision, title, total_time, version) FROM stdin;
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe_ingredients (recipe_id, ingredients_id) FROM stdin;
\.


--
-- Data for Name: recipe_instructions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe_instructions (recipe_id, instructions_id) FROM stdin;
\.


--
-- Data for Name: recipe_outputs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe_outputs (recipe_id, outputs_id) FROM stdin;
\.


--
-- Data for Name: recipe_works; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe_works (recipe_id, works_id) FROM stdin;
\.


--
-- Data for Name: sales_prospect; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sales_prospect (id, period) FROM stdin;
\.


--
-- Data for Name: sales_prospect_prospected; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sales_prospect_prospected (sales_prospect_id, prospected_id) FROM stdin;
\.


--
-- Data for Name: transaction_modality; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.transaction_modality (id, description, name, favorite_id) FROM stdin;
32	\N	Espécie	\N
33	\N	Cheque	\N
34	\N	Cartão de crédito (à vista)	\N
35	\N	Cartão de crédito (à prazo)	\N
36	\N	Cartão de débito	\N
37	\N	Crédito loja	\N
38	\N	Boleto bancário	\N
\.


--
-- Data for Name: transaction_voucher; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.transaction_voucher (id, content_type, file_extension, voucher) FROM stdin;
\.


--
-- Data for Name: unit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.unit (id, name, pluralized_name, symbol, quantity_id) FROM stdin;
5	quilograma	quilogramas	kg	2
6	litro	litros	L	1
7	mililitro	mililitros	mL	1
8	unidade	unidades	UN	2
9	minuto	minutos	min	3
10	grama	gramas	g	2
\.


--
-- Data for Name: unit_converter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.unit_converter (id, ratio, unita_id, unitb_id) FROM stdin;
\.


--
-- Data for Name: unit_quantity; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.unit_quantity (id, name, favorite_id) FROM stdin;
1	volume	7
2	peso	10
3	tempo	9
4	outros	8
\.


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hibernate_sequence', 49, true);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: address_type address_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address_type
    ADD CONSTRAINT address_type_pkey PRIMARY KEY (id);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: client_order client_order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order
    ADD CONSTRAINT client_order_pkey PRIMARY KEY (id);


--
-- Name: contact_channel contact_channel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_channel
    ADD CONSTRAINT contact_channel_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: databasechangeloglock databasechangeloglock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);


--
-- Name: delivery_event delivery_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_event
    ADD CONSTRAINT delivery_event_pkey PRIMARY KEY (id);


--
-- Name: delivery_order_event delivery_order_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_event
    ADD CONSTRAINT delivery_order_event_pkey PRIMARY KEY (id);


--
-- Name: delivery_order delivery_order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order
    ADD CONSTRAINT delivery_order_pkey PRIMARY KEY (id);


--
-- Name: delivery_payment_by_neighborhood delivery_payment_by_neighborhood_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_payment_by_neighborhood
    ADD CONSTRAINT delivery_payment_by_neighborhood_pkey PRIMARY KEY (id);


--
-- Name: delivery delivery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_pkey PRIMARY KEY (id);


--
-- Name: delivery_price_by_neighborhood delivery_price_by_neighborhood_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_price_by_neighborhood
    ADD CONSTRAINT delivery_price_by_neighborhood_pkey PRIMARY KEY (id);


--
-- Name: deliveryman_contract deliveryman_contract_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_contract
    ADD CONSTRAINT deliveryman_contract_pkey PRIMARY KEY (id);


--
-- Name: deliveryman_payment deliveryman_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payment
    ADD CONSTRAINT deliveryman_payment_pkey PRIMARY KEY (id);


--
-- Name: deliveryman deliveryman_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman
    ADD CONSTRAINT deliveryman_pkey PRIMARY KEY (id);


--
-- Name: deliveryman_work_day deliveryman_work_day_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_day
    ADD CONSTRAINT deliveryman_work_day_pkey PRIMARY KEY (id);


--
-- Name: entry entry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entry
    ADD CONSTRAINT entry_pkey PRIMARY KEY (id);


--
-- Name: favorite_recipe favorite_recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_recipe
    ADD CONSTRAINT favorite_recipe_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: functionary_contract functionary_contract_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_contract
    ADD CONSTRAINT functionary_contract_pkey PRIMARY KEY (id);


--
-- Name: functionary_contract_template functionary_contract_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_contract_template
    ADD CONSTRAINT functionary_contract_template_pkey PRIMARY KEY (id);


--
-- Name: functionary_function functionary_function_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_function
    ADD CONSTRAINT functionary_function_pkey PRIMARY KEY (id);


--
-- Name: functionary_payment functionary_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_payment
    ADD CONSTRAINT functionary_payment_pkey PRIMARY KEY (id);


--
-- Name: functionary_work_day functionary_work_day_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_work_day
    ADD CONSTRAINT functionary_work_day_pkey PRIMARY KEY (id);


--
-- Name: functionary_working_time functionary_working_time_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_working_time
    ADD CONSTRAINT functionary_working_time_pkey PRIMARY KEY (id);


--
-- Name: generic_transaction generic_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generic_transaction
    ADD CONSTRAINT generic_transaction_pkey PRIMARY KEY (id);


--
-- Name: ingredient_replacement ingredient_replacement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredient_replacement
    ADD CONSTRAINT ingredient_replacement_pkey PRIMARY KEY (id);


--
-- Name: input_equivalence input_equivalence_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_equivalence
    ADD CONSTRAINT input_equivalence_pkey PRIMARY KEY (id);


--
-- Name: input input_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT input_pkey PRIMARY KEY (id);


--
-- Name: input_price input_price_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_price
    ADD CONSTRAINT input_price_pkey PRIMARY KEY (id);


--
-- Name: input_unit_converter input_unit_converter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_unit_converter
    ADD CONSTRAINT input_unit_converter_pkey PRIMARY KEY (id);


--
-- Name: instruction instruction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instruction
    ADD CONSTRAINT instruction_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: menu_item menu_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_item
    ADD CONSTRAINT menu_item_pkey PRIMARY KEY (id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: neighborhood neighborhood_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.neighborhood
    ADD CONSTRAINT neighborhood_pkey PRIMARY KEY (id);


--
-- Name: nfce nfce_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nfce
    ADD CONSTRAINT nfce_pkey PRIMARY KEY (id);


--
-- Name: nfce_xml nfce_xml_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nfce_xml
    ADD CONSTRAINT nfce_xml_pkey PRIMARY KEY (id);


--
-- Name: order_event order_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_event
    ADD CONSTRAINT order_event_pkey PRIMARY KEY (id);


--
-- Name: order_item_event order_item_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_event
    ADD CONSTRAINT order_item_event_pkey PRIMARY KEY (id);


--
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);


--
-- Name: order_price_modifier order_price_modifier_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_price_modifier
    ADD CONSTRAINT order_price_modifier_pkey PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);


--
-- Name: product_items product_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT product_items_pkey PRIMARY KEY (product_id, items_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product_price product_price_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT product_price_pkey PRIMARY KEY (id);


--
-- Name: product_prices product_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT product_prices_pkey PRIMARY KEY (product_id, prices_id);


--
-- Name: product_recipe product_recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_recipe
    ADD CONSTRAINT product_recipe_pkey PRIMARY KEY (id);


--
-- Name: products_harmonization products_harmonization_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_harmonization
    ADD CONSTRAINT products_harmonization_pkey PRIMARY KEY (id);


--
-- Name: provider provider_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provider
    ADD CONSTRAINT provider_pkey PRIMARY KEY (id);


--
-- Name: pruduced_product pruduced_product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pruduced_product
    ADD CONSTRAINT pruduced_product_pkey PRIMARY KEY (id);


--
-- Name: purchase_item purchase_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_item
    ADD CONSTRAINT purchase_item_pkey PRIMARY KEY (id);


--
-- Name: purchase purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (id);


--
-- Name: purchase_product purchase_product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_product
    ADD CONSTRAINT purchase_product_pkey PRIMARY KEY (id);


--
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);


--
-- Name: sales_prospect sales_prospect_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_prospect
    ADD CONSTRAINT sales_prospect_pkey PRIMARY KEY (id);


--
-- Name: transaction_modality transaction_modality_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_modality
    ADD CONSTRAINT transaction_modality_pkey PRIMARY KEY (id);


--
-- Name: transaction_voucher transaction_voucher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_voucher
    ADD CONSTRAINT transaction_voucher_pkey PRIMARY KEY (id);


--
-- Name: menu_items uk_166mcrdqar5cd3pssf89ahc4r; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT uk_166mcrdqar5cd3pssf89ahc4r UNIQUE (items_id);


--
-- Name: product_items uk_1vg760y6ywggxis2eecgiyugj; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT uk_1vg760y6ywggxis2eecgiyugj UNIQUE (items_id);


--
-- Name: client_order_payments uk_2mst94rllixkus07yecvdej79; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_payments
    ADD CONSTRAINT uk_2mst94rllixkus07yecvdej79 UNIQUE (payments_id);


--
-- Name: delivery_events uk_2nhttptr9jtp408uqdncxxqq3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_events
    ADD CONSTRAINT uk_2nhttptr9jtp408uqdncxxqq3 UNIQUE (events_id);


--
-- Name: deliveryman_contracts uk_2t5tnkrg8yp5cldliuhfd60o9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_contracts
    ADD CONSTRAINT uk_2t5tnkrg8yp5cldliuhfd60o9 UNIQUE (contracts_id);


--
-- Name: order_item_movements uk_38g8tusjx8jqfvq0qi5dxxjuo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_movements
    ADD CONSTRAINT uk_38g8tusjx8jqfvq0qi5dxxjuo UNIQUE (movements_id);


--
-- Name: delivery_order_events uk_5m3sbed367mkrn4x76mwr5f23; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_events
    ADD CONSTRAINT uk_5m3sbed367mkrn4x76mwr5f23 UNIQUE (events_id);


--
-- Name: deliveryman_payments uk_6qrk9uncxsyr3b365vnvq3kbj; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payments
    ADD CONSTRAINT uk_6qrk9uncxsyr3b365vnvq3kbj UNIQUE (payments_id);


--
-- Name: recipe_instructions uk_6s2afddurnwwjppspbl3fp4p2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_instructions
    ADD CONSTRAINT uk_6s2afddurnwwjppspbl3fp4p2 UNIQUE (instructions_id);


--
-- Name: unit uk_8qps0pp9d6tnddwey8dwro5jk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT uk_8qps0pp9d6tnddwey8dwro5jk UNIQUE (symbol);


--
-- Name: deliveryman_payment_work_days uk_99jsgjr9ft32hiifan32gsp9u; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payment_work_days
    ADD CONSTRAINT uk_99jsgjr9ft32hiifan32gsp9u UNIQUE (work_days_id);


--
-- Name: product_category uk_9qvug0bmpkmxkkx33q51m7do7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT uk_9qvug0bmpkmxkkx33q51m7do7 UNIQUE (name);


--
-- Name: order_price_modifier uk_9wtsddub9xu3q7d84mqfqow8q; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_price_modifier
    ADD CONSTRAINT uk_9wtsddub9xu3q7d84mqfqow8q UNIQUE (description);


--
-- Name: recipe_ingredients uk_adlqiu427fu7igg7385el0xjh; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT uk_adlqiu427fu7igg7385el0xjh UNIQUE (ingredients_id);


--
-- Name: pruduced_product_movements uk_amandmnb5gevhmpjb5hyjwf8i; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pruduced_product_movements
    ADD CONSTRAINT uk_amandmnb5gevhmpjb5hyjwf8i UNIQUE (movements_id);


--
-- Name: account uk_bb9lrmwswqvhcy1y430ki00ir; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT uk_bb9lrmwswqvhcy1y430ki00ir UNIQUE (name);


--
-- Name: transaction_modality uk_bjejw81a0ub1w0fcme9e9p0i9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_modality
    ADD CONSTRAINT uk_bjejw81a0ub1w0fcme9e9p0i9 UNIQUE (name);


--
-- Name: provider uk_cfgo93bl0v243co72ay26bs94; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provider
    ADD CONSTRAINT uk_cfgo93bl0v243co72ay26bs94 UNIQUE (name);


--
-- Name: contact_channel uk_cyn8prbxhx0g26yu1ed6ic06q; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_channel
    ADD CONSTRAINT uk_cyn8prbxhx0g26yu1ed6ic06q UNIQUE (name);


--
-- Name: generic_transaction_entries uk_d3l9ckaattanqyitm5kbxt797; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generic_transaction_entries
    ADD CONSTRAINT uk_d3l9ckaattanqyitm5kbxt797 UNIQUE (entries_id);


--
-- Name: input_converters uk_dg4mvi9m7vjds1thoqiiskq75; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_converters
    ADD CONSTRAINT uk_dg4mvi9m7vjds1thoqiiskq75 UNIQUE (converters_id);


--
-- Name: client_order_items uk_dwu2m3rnd5d0akp3ocj07tci0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_items
    ADD CONSTRAINT uk_dwu2m3rnd5d0akp3ocj07tci0 UNIQUE (items_id);


--
-- Name: order_item_items uk_ehca5qdyrp5kk3ejfmlk7ll3w; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_items
    ADD CONSTRAINT uk_ehca5qdyrp5kk3ejfmlk7ll3w UNIQUE (items_id);


--
-- Name: provider uk_fbdywrwdf7m8k2c8dk9h8xqn1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provider
    ADD CONSTRAINT uk_fbdywrwdf7m8k2c8dk9h8xqn1 UNIQUE (cnpj);


--
-- Name: deliveryman_work_day_deliveries uk_fkuc2490enooqn0hhfq3kn9ww; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_day_deliveries
    ADD CONSTRAINT uk_fkuc2490enooqn0hhfq3kn9ww UNIQUE (deliveries_id);


--
-- Name: item_replacements uk_fs5dvtid14s874qyhkkm4cjcx; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_replacements
    ADD CONSTRAINT uk_fs5dvtid14s874qyhkkm4cjcx UNIQUE (replacements_id);


--
-- Name: order_item_sub_items uk_hj2fnockcg31fh4c9bd0l7jg9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_sub_items
    ADD CONSTRAINT uk_hj2fnockcg31fh4c9bd0l7jg9 UNIQUE (sub_items_id);


--
-- Name: client_order_deliveries uk_ho21lsqg97qbhm579je93ewn9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_deliveries
    ADD CONSTRAINT uk_ho21lsqg97qbhm579je93ewn9 UNIQUE (deliveries_id);


--
-- Name: recipe_works uk_hqs0f8ggnbo7wo639fseht7qw; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_works
    ADD CONSTRAINT uk_hqs0f8ggnbo7wo639fseht7qw UNIQUE (works_id);


--
-- Name: client_order_events uk_ixgno0qvm4ip2tt9amxm7ouu3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_events
    ADD CONSTRAINT uk_ixgno0qvm4ip2tt9amxm7ouu3 UNIQUE (events_id);


--
-- Name: purchase_items uk_k6ghloc692e9a711brl893efh; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_items
    ADD CONSTRAINT uk_k6ghloc692e9a711brl893efh UNIQUE (items_id);


--
-- Name: client_order_modifiers uk_m6rsj50cv788bkeikax16s8th; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_modifiers
    ADD CONSTRAINT uk_m6rsj50cv788bkeikax16s8th UNIQUE (modifiers_id);


--
-- Name: input uk_nb107qoj0il39irgvkaxcp21q; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT uk_nb107qoj0il39irgvkaxcp21q UNIQUE (name);


--
-- Name: delivery_orders uk_nv4dcem4no1jpvqqt6y7n2t24; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_orders
    ADD CONSTRAINT uk_nv4dcem4no1jpvqqt6y7n2t24 UNIQUE (orders_id);


--
-- Name: order_item_events uk_po7elnx7comdbra6iehnnyosx; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_events
    ADD CONSTRAINT uk_po7elnx7comdbra6iehnnyosx UNIQUE (events_id);


--
-- Name: delivery_order_to_delivery uk_pu1wl4ymm31g386fe99wjqht4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_to_delivery
    ADD CONSTRAINT uk_pu1wl4ymm31g386fe99wjqht4 UNIQUE (to_delivery_id);


--
-- Name: unit_quantity uk_q6llsekxil3no0ild5rqp03km; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_quantity
    ADD CONSTRAINT uk_q6llsekxil3no0ild5rqp03km UNIQUE (name);


--
-- Name: deliveryman_work_days uk_qdg3yrggedsfqc4fys4goj8cs; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_days
    ADD CONSTRAINT uk_qdg3yrggedsfqc4fys4goj8cs UNIQUE (work_days_id);


--
-- Name: delivery_order_items uk_qffo9ug79vjoqmc9gvjjv7jnu; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_items
    ADD CONSTRAINT uk_qffo9ug79vjoqmc9gvjjv7jnu UNIQUE (items_id);


--
-- Name: product_prices uk_r1vl4gvv2aucrgenaiftjn03f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT uk_r1vl4gvv2aucrgenaiftjn03f UNIQUE (prices_id);


--
-- Name: functionary_payment_days uk_rfjkv7jnvk659b4al3y2p3a56; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_payment_days
    ADD CONSTRAINT uk_rfjkv7jnvk659b4al3y2p3a56 UNIQUE (days_id);


--
-- Name: address_type uk_rkfxa9waujg49ekmffyyaviem; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address_type
    ADD CONSTRAINT uk_rkfxa9waujg49ekmffyyaviem UNIQUE (name);


--
-- Name: delivery_order_deliveries uk_s5qk0h38rxy1fn1gsjolgliwg; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_deliveries
    ADD CONSTRAINT uk_s5qk0h38rxy1fn1gsjolgliwg UNIQUE (deliveries_id);


--
-- Name: input_prices uk_t22rub9l0pk6srrjgd17m3mvd; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_prices
    ADD CONSTRAINT uk_t22rub9l0pk6srrjgd17m3mvd UNIQUE (prices_id);


--
-- Name: recipe_outputs uk_t4gbglsh1utxua2a8p4dl36jr; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_outputs
    ADD CONSTRAINT uk_t4gbglsh1utxua2a8p4dl36jr UNIQUE (outputs_id);


--
-- Name: unit_converter unit_converter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_converter
    ADD CONSTRAINT unit_converter_pkey PRIMARY KEY (id);


--
-- Name: unit unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT unit_pkey PRIMARY KEY (id);


--
-- Name: unit_quantity unit_quantity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_quantity
    ADD CONSTRAINT unit_quantity_pkey PRIMARY KEY (id);


--
-- Name: person_contacts fk12co01nuk6fydsukv7ddf0fhl; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_contacts
    ADD CONSTRAINT fk12co01nuk6fydsukv7ddf0fhl FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: menu_item fk15mh93cvqy0wv1etwt4sa8vqa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_item
    ADD CONSTRAINT fk15mh93cvqy0wv1etwt4sa8vqa FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: feedback fk1bh7klmhy41xryvei7b2fij97; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fk1bh7klmhy41xryvei7b2fij97 FOREIGN KEY (order_id) REFERENCES public.client_order(id);


--
-- Name: recipe_works fk2deho1td3pwoiy1fc8fesgog0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_works
    ADD CONSTRAINT fk2deho1td3pwoiy1fc8fesgog0 FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: delivery_order_events fk2l6r1sg88roxj7ju2nm9fj7sq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_events
    ADD CONSTRAINT fk2l6r1sg88roxj7ju2nm9fj7sq FOREIGN KEY (events_id) REFERENCES public.delivery_order_event(id);


--
-- Name: purchase fk2q6ghkxpcms48acnaaoaofwra; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT fk2q6ghkxpcms48acnaaoaofwra FOREIGN KEY (transaction_id) REFERENCES public.generic_transaction(id);


--
-- Name: item_replacements fk2ynqic7h2m6po5f3j7p2l8f2n; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_replacements
    ADD CONSTRAINT fk2ynqic7h2m6po5f3j7p2l8f2n FOREIGN KEY (replacements_id) REFERENCES public.ingredient_replacement(id);


--
-- Name: item fk2yyvrfmbkcremcjx11vjywoj4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk2yyvrfmbkcremcjx11vjywoj4 FOREIGN KEY (input_id) REFERENCES public.input(id);


--
-- Name: deliveryman_payments fk30q54g7p1458owocx3jaudlpj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payments
    ADD CONSTRAINT fk30q54g7p1458owocx3jaudlpj FOREIGN KEY (deliveryman_id) REFERENCES public.deliveryman(id);


--
-- Name: order_item_sub_items fk4bco5u2p77uryhtf6c8t658d1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_sub_items
    ADD CONSTRAINT fk4bco5u2p77uryhtf6c8t658d1 FOREIGN KEY (sub_items_id) REFERENCES public.order_item(id);


--
-- Name: entry fk4co40llmt3yampxxsbfvp9itq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entry
    ADD CONSTRAINT fk4co40llmt3yampxxsbfvp9itq FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: product_prices fk4uri2quko3srle7k87hdakx0q; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT fk4uri2quko3srle7k87hdakx0q FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: ingredient_replacement fk4vp1dhl1hja1vscp72pvrs2ac; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredient_replacement
    ADD CONSTRAINT fk4vp1dhl1hja1vscp72pvrs2ac FOREIGN KEY (input_id) REFERENCES public.input(id);


--
-- Name: input_prices fk4x6numoxch2w5ksbitw95aulv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_prices
    ADD CONSTRAINT fk4x6numoxch2w5ksbitw95aulv FOREIGN KEY (prices_id) REFERENCES public.input_price(id);


--
-- Name: deliveryman_work_day_deliveries fk4ybneyysos71p72a8p09ahmmp; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_day_deliveries
    ADD CONSTRAINT fk4ybneyysos71p72a8p09ahmmp FOREIGN KEY (deliveries_id) REFERENCES public.delivery(id);


--
-- Name: order_item fk551losx9j75ss5d6bfsqvijna; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk551losx9j75ss5d6bfsqvijna FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: item fk5m8eoigkb7qwll4yvqyfk2rs5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk5m8eoigkb7qwll4yvqyfk2rs5 FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: purchase_item fk5ot7abtcfjo4ujvxu2yqi0e14; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_item
    ADD CONSTRAINT fk5ot7abtcfjo4ujvxu2yqi0e14 FOREIGN KEY (inventory_movement_id) REFERENCES public.item(id);


--
-- Name: recipe_instructions fk5vnp7klf6xxqhcyb59v8odtng; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_instructions
    ADD CONSTRAINT fk5vnp7klf6xxqhcyb59v8odtng FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: purchase_items fk606voercdyoieorwxu0ux22xw; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_items
    ADD CONSTRAINT fk606voercdyoieorwxu0ux22xw FOREIGN KEY (items_id) REFERENCES public.purchase_item(id);


--
-- Name: deliveryman_contract_payment_for_delivery_by_neighborhood fk6ppbtedtvq0fgquvtx0bhp0e2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_contract_payment_for_delivery_by_neighborhood
    ADD CONSTRAINT fk6ppbtedtvq0fgquvtx0bhp0e2 FOREIGN KEY (payment_for_delivery_by_neighborhood_id) REFERENCES public.delivery_payment_by_neighborhood(id);


--
-- Name: product_recipe fk6tj2dt8ryi10w23q2s7dentmq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_recipe
    ADD CONSTRAINT fk6tj2dt8ryi10w23q2s7dentmq FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: delivery_order_items fk771cv9c4prba09ni4ldw5ig44; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_items
    ADD CONSTRAINT fk771cv9c4prba09ni4ldw5ig44 FOREIGN KEY (items_id) REFERENCES public.order_item(id);


--
-- Name: deliveryman_work_day fk7hrc6sdopmkhm26mqik1i1b83; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_day
    ADD CONSTRAINT fk7hrc6sdopmkhm26mqik1i1b83 FOREIGN KEY (contract_id) REFERENCES public.deliveryman_contract(id);


--
-- Name: unit_converter fk7oprpu4r4hkr18i9srtw68o25; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_converter
    ADD CONSTRAINT fk7oprpu4r4hkr18i9srtw68o25 FOREIGN KEY (unita_id) REFERENCES public.unit(id);


--
-- Name: deliveryman_work_day_deliveries fk7pwfg26sb9hyp1617gq0x3htd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_day_deliveries
    ADD CONSTRAINT fk7pwfg26sb9hyp1617gq0x3htd FOREIGN KEY (deliveryman_work_day_id) REFERENCES public.deliveryman_work_day(id);


--
-- Name: input_unit_converter fk7we3tqf4ay4os2408vhlt0ke1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_unit_converter
    ADD CONSTRAINT fk7we3tqf4ay4os2408vhlt0ke1 FOREIGN KEY (unita_id) REFERENCES public.unit(id);


--
-- Name: client_order_deliveries fk8hou3tjew373syc9wxiv83ufe; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_deliveries
    ADD CONSTRAINT fk8hou3tjew373syc9wxiv83ufe FOREIGN KEY (client_order_id) REFERENCES public.client_order(id);


--
-- Name: feedback fk8khyckjdpxwf9fbj1klxqcap7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fk8khyckjdpxwf9fbj1klxqcap7 FOREIGN KEY (contact_id) REFERENCES public.contact(id);


--
-- Name: functionary_contract fk8peoqog8dl7qcivt6p55tsvwc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_contract
    ADD CONSTRAINT fk8peoqog8dl7qcivt6p55tsvwc FOREIGN KEY (functionary_id) REFERENCES public.person(id);


--
-- Name: card fk8v67eys6tqflsm6hrdgru2phu; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT fk8v67eys6tqflsm6hrdgru2phu FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: deliveryman_contracts fk9cps044u0oyv1v1bpst6nk1k; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_contracts
    ADD CONSTRAINT fk9cps044u0oyv1v1bpst6nk1k FOREIGN KEY (deliveryman_id) REFERENCES public.deliveryman(id);


--
-- Name: client_order_modifiers fk9iemwsmawn1oj1wago3wail92; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_modifiers
    ADD CONSTRAINT fk9iemwsmawn1oj1wago3wail92 FOREIGN KEY (modifiers_id) REFERENCES public.order_price_modifier(id);


--
-- Name: deliveryman_payments fk9ot1bkkgh0lx9u8791rjcpp7p; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payments
    ADD CONSTRAINT fk9ot1bkkgh0lx9u8791rjcpp7p FOREIGN KEY (payments_id) REFERENCES public.deliveryman_payment(id);


--
-- Name: client_order_modifiers fk9rq2uwchdidtysliqddocas79; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_modifiers
    ADD CONSTRAINT fk9rq2uwchdidtysliqddocas79 FOREIGN KEY (client_order_id) REFERENCES public.client_order(id);


--
-- Name: products_harmonization fka0opg6pljnkwtfirswi73vga9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_harmonization
    ADD CONSTRAINT fka0opg6pljnkwtfirswi73vga9 FOREIGN KEY (a_id) REFERENCES public.product(id);


--
-- Name: delivery_orders fka1ikpjhwwhy3scn7mt59rltdv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_orders
    ADD CONSTRAINT fka1ikpjhwwhy3scn7mt59rltdv FOREIGN KEY (delivery_id) REFERENCES public.delivery(id);


--
-- Name: unit fka3j9r4l9rmnoly7sa6nwsoek5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT fka3j9r4l9rmnoly7sa6nwsoek5 FOREIGN KEY (quantity_id) REFERENCES public.unit_quantity(id);


--
-- Name: deliveryman_payment fka9xx7x8ms6ankba7d0o6xe2r4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payment
    ADD CONSTRAINT fka9xx7x8ms6ankba7d0o6xe2r4 FOREIGN KEY (transaction_id) REFERENCES public.generic_transaction(id);


--
-- Name: client_order_items fkahbdcs8xlxm6cwjh75rio4mcp; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_items
    ADD CONSTRAINT fkahbdcs8xlxm6cwjh75rio4mcp FOREIGN KEY (client_order_id) REFERENCES public.client_order(id);


--
-- Name: delivery_order_events fkavbbewjb40or09x8rnndsfsuj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_events
    ADD CONSTRAINT fkavbbewjb40or09x8rnndsfsuj FOREIGN KEY (delivery_order_id) REFERENCES public.delivery_order(id);


--
-- Name: account fkb3e0genhvq96v47x69di6q12w; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT fkb3e0genhvq96v47x69di6q12w FOREIGN KEY (mother_account_id) REFERENCES public.account(id);


--
-- Name: input_price fkbf6x0pc09w10qrov1g6hghiww; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_price
    ADD CONSTRAINT fkbf6x0pc09w10qrov1g6hghiww FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: functionary_contract_functions fkbi4f3l5pnxnp42is0udcdv0j7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_contract_functions
    ADD CONSTRAINT fkbi4f3l5pnxnp42is0udcdv0j7 FOREIGN KEY (functionary_contract_id) REFERENCES public.functionary_contract(id);


--
-- Name: menu_item_items fkc3a6d6cuj3emsrcn2w9rpr0yy; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_item_items
    ADD CONSTRAINT fkc3a6d6cuj3emsrcn2w9rpr0yy FOREIGN KEY (menu_section_id) REFERENCES public.menu_item(id);


--
-- Name: deliveryman_contracts fkccs0if314dc5dsfywtnpm8ave; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_contracts
    ADD CONSTRAINT fkccs0if314dc5dsfywtnpm8ave FOREIGN KEY (contracts_id) REFERENCES public.deliveryman_contract(id);


--
-- Name: client_order fkcd62cagiru8p0hublbc46qu0g; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order
    ADD CONSTRAINT fkcd62cagiru8p0hublbc46qu0g FOREIGN KEY (forecast_payment_modality_id) REFERENCES public.transaction_modality(id);


--
-- Name: delivery_orders fkd5ehacwk6qoo1jkl5fsgg2eg8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_orders
    ADD CONSTRAINT fkd5ehacwk6qoo1jkl5fsgg2eg8 FOREIGN KEY (orders_id) REFERENCES public.delivery_order(id);


--
-- Name: address fkd86d3wedtcde8av17lrjwqce3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fkd86d3wedtcde8av17lrjwqce3 FOREIGN KEY (type_id) REFERENCES public.address_type(id);


--
-- Name: input fkdl4ltdoahbahkoxqah7xqbda8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT fkdl4ltdoahbahkoxqah7xqbda8 FOREIGN KEY (favorite_id) REFERENCES public.unit(id);


--
-- Name: generic_transaction_entries fkdrh2d3selmlhvclu91edciran; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generic_transaction_entries
    ADD CONSTRAINT fkdrh2d3selmlhvclu91edciran FOREIGN KEY (entries_id) REFERENCES public.entry(id);


--
-- Name: item fkdslletxhla0nehtlnmh63m2sj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fkdslletxhla0nehtlnmh63m2sj FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: functionary_work_day fkdsvv8lm70aqrde78bt6pngjov; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_work_day
    ADD CONSTRAINT fkdsvv8lm70aqrde78bt6pngjov FOREIGN KEY (work_contract_id) REFERENCES public.functionary_contract(id);


--
-- Name: address fkdxhmuat5wh4dhiynylp7nh76y; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fkdxhmuat5wh4dhiynylp7nh76y FOREIGN KEY (neighborhood_id) REFERENCES public.neighborhood(id);


--
-- Name: purchase fkdy7v556ts4pyi0qhrak3oglre; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT fkdy7v556ts4pyi0qhrak3oglre FOREIGN KEY (provider_id) REFERENCES public.provider(id);


--
-- Name: delivery_order fke2iw964fgfr88crax5k319k5i; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order
    ADD CONSTRAINT fke2iw964fgfr88crax5k319k5i FOREIGN KEY (delivery_address_id) REFERENCES public.address(id);


--
-- Name: person_addresses fkecc9xua6492md5768gk9t4p2g; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_addresses
    ADD CONSTRAINT fkecc9xua6492md5768gk9t4p2g FOREIGN KEY (addresses_id) REFERENCES public.address(id);


--
-- Name: menu_items fkep2hckbthh3hj9vlodwewoyq4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT fkep2hckbthh3hj9vlodwewoyq4 FOREIGN KEY (items_id) REFERENCES public.menu_item(id);


--
-- Name: nfce fkepmyyi3l1wljes6embavptnn7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nfce
    ADD CONSTRAINT fkepmyyi3l1wljes6embavptnn7 FOREIGN KEY (xml_id) REFERENCES public.nfce_xml(id);


--
-- Name: generic_transaction_entries fkevlsuegf3pmliblitnbrokc2v; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generic_transaction_entries
    ADD CONSTRAINT fkevlsuegf3pmliblitnbrokc2v FOREIGN KEY (generic_transaction_id) REFERENCES public.generic_transaction(id);


--
-- Name: purchase_items fkfbch0rs5h1ih9ng5tn5ydi7vm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_items
    ADD CONSTRAINT fkfbch0rs5h1ih9ng5tn5ydi7vm FOREIGN KEY (purchase_id) REFERENCES public.purchase(id);


--
-- Name: client_order_payments fkfey6vimxrirv1bd285irnkmcr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_payments
    ADD CONSTRAINT fkfey6vimxrirv1bd285irnkmcr FOREIGN KEY (payments_id) REFERENCES public.generic_transaction(id);


--
-- Name: product_categories fkg17eropvif2jlfu993ngjkxbl; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT fkg17eropvif2jlfu993ngjkxbl FOREIGN KEY (categories_id) REFERENCES public.product_category(id);


--
-- Name: person_addresses fkg4hhg5iayyfbeatys0g0jedu5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_addresses
    ADD CONSTRAINT fkg4hhg5iayyfbeatys0g0jedu5 FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: delivery_events fkg6ctkij2yaek3qgx81s845wae; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_events
    ADD CONSTRAINT fkg6ctkij2yaek3qgx81s845wae FOREIGN KEY (delivery_id) REFERENCES public.delivery(id);


--
-- Name: pruduced_product_movements fkge6qsyfp90tt3ww0rnc415wlv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pruduced_product_movements
    ADD CONSTRAINT fkge6qsyfp90tt3ww0rnc415wlv FOREIGN KEY (pruduced_product_id) REFERENCES public.pruduced_product(id);


--
-- Name: recipe_works fkgoopb744ame58qbfyocco0ma0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_works
    ADD CONSTRAINT fkgoopb744ame58qbfyocco0ma0 FOREIGN KEY (works_id) REFERENCES public.functionary_working_time(id);


--
-- Name: functionary_avaliable_days fkgrw98m8r29rjuy9tdww7d7xcc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_avaliable_days
    ADD CONSTRAINT fkgrw98m8r29rjuy9tdww7d7xcc FOREIGN KEY (functionary_id) REFERENCES public.person(id);


--
-- Name: functionary_payment_days fkh721wjlr10n4mnk5l66s55st8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_payment_days
    ADD CONSTRAINT fkh721wjlr10n4mnk5l66s55st8 FOREIGN KEY (functionary_payment_id) REFERENCES public.functionary_payment(id);


--
-- Name: menu_items fkh788p5mv4cmsg53s1ynvibkua; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT fkh788p5mv4cmsg53s1ynvibkua FOREIGN KEY (menu_id) REFERENCES public.menu(id);


--
-- Name: functionary_contract_template fkh7tiox4ny5ny2beb3rpv3fl4g; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_contract_template
    ADD CONSTRAINT fkh7tiox4ny5ny2beb3rpv3fl4g FOREIGN KEY (function_id) REFERENCES public.functionary_function(id);


--
-- Name: menu_item_items fkh7v0bjpfxsey3qe9848bf2cf1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_item_items
    ADD CONSTRAINT fkh7v0bjpfxsey3qe9848bf2cf1 FOREIGN KEY (items_id) REFERENCES public.menu_item(id);


--
-- Name: pruduced_product_movements fkhab7dkx147bsq2sgh0rpeyxmv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pruduced_product_movements
    ADD CONSTRAINT fkhab7dkx147bsq2sgh0rpeyxmv FOREIGN KEY (movements_id) REFERENCES public.item(id);


--
-- Name: recipe_ingredients fkhnsmvxdlwxqq6x2wbgnoef5gr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT fkhnsmvxdlwxqq6x2wbgnoef5gr FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: unit_converter fkhrimpuwcpp92nnf94vxrqmnbd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_converter
    ADD CONSTRAINT fkhrimpuwcpp92nnf94vxrqmnbd FOREIGN KEY (unitb_id) REFERENCES public.unit(id);


--
-- Name: deliveryman_avaliable_days fki0v1y50il3n5mffvk645qv62n; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_avaliable_days
    ADD CONSTRAINT fki0v1y50il3n5mffvk645qv62n FOREIGN KEY (deliveryman_id) REFERENCES public.deliveryman(id);


--
-- Name: client_order_events fki4t546mqiba098c82oc1b9a4d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_events
    ADD CONSTRAINT fki4t546mqiba098c82oc1b9a4d FOREIGN KEY (events_id) REFERENCES public.order_event(id);


--
-- Name: recipe_ingredients fki8k1ijih6flm73xh36mfqp77l; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT fki8k1ijih6flm73xh36mfqp77l FOREIGN KEY (ingredients_id) REFERENCES public.item(id);


--
-- Name: unit_quantity fkig93kg6c9us8x7peyc5fqb1ap; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_quantity
    ADD CONSTRAINT fkig93kg6c9us8x7peyc5fqb1ap FOREIGN KEY (favorite_id) REFERENCES public.unit(id);


--
-- Name: products_harmonization fkigtaju71ytx2igvq3285702rf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_harmonization
    ADD CONSTRAINT fkigtaju71ytx2igvq3285702rf FOREIGN KEY (b_id) REFERENCES public.product(id);


--
-- Name: generic_transaction fkii8kes70krcyf8oa11mfmph0l; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generic_transaction
    ADD CONSTRAINT fkii8kes70krcyf8oa11mfmph0l FOREIGN KEY (modality_id) REFERENCES public.transaction_modality(id);


--
-- Name: product_prices fkivj1fjgucmjnucfgy6c5ui69c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT fkivj1fjgucmjnucfgy6c5ui69c FOREIGN KEY (prices_id) REFERENCES public.product_price(id);


--
-- Name: person fkiyv5708nn4k5w34ph5dofk6ag; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT fkiyv5708nn4k5w34ph5dofk6ag FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: delivery_price_by_neighborhood fkj18na9sspxupkh3wi4vfn86y6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_price_by_neighborhood
    ADD CONSTRAINT fkj18na9sspxupkh3wi4vfn86y6 FOREIGN KEY (neighborhood_id) REFERENCES public.neighborhood(id);


--
-- Name: functionary_working_time fkj4q02qssa6l8k8q1nyygof57v; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_working_time
    ADD CONSTRAINT fkj4q02qssa6l8k8q1nyygof57v FOREIGN KEY (functionary_function_id) REFERENCES public.functionary_function(id);


--
-- Name: client_order_payments fkj9y9ortkripbhn65iyjy9escf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_payments
    ADD CONSTRAINT fkj9y9ortkripbhn65iyjy9escf FOREIGN KEY (client_order_id) REFERENCES public.client_order(id);


--
-- Name: purchase fkja9h199rym9mqiyw7e64ndeft; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT fkja9h199rym9mqiyw7e64ndeft FOREIGN KEY (nfce_id) REFERENCES public.nfce(id);


--
-- Name: product_items fkjerkcmi51isrr4hmxqjcxmh5b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT fkjerkcmi51isrr4hmxqjcxmh5b FOREIGN KEY (items_id) REFERENCES public.item(id);


--
-- Name: order_item_events fkjirywfjk436867u783nt7hsgf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_events
    ADD CONSTRAINT fkjirywfjk436867u783nt7hsgf FOREIGN KEY (events_id) REFERENCES public.order_item_event(id);


--
-- Name: input_converters fkk8ti67qyfu7auh8is4hmlgub1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_converters
    ADD CONSTRAINT fkk8ti67qyfu7auh8is4hmlgub1 FOREIGN KEY (converters_id) REFERENCES public.input_unit_converter(id);


--
-- Name: recipe_instructions fkk9wv0chs3lbuw99w74wu9f20a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_instructions
    ADD CONSTRAINT fkk9wv0chs3lbuw99w74wu9f20a FOREIGN KEY (instructions_id) REFERENCES public.instruction(id);


--
-- Name: person fkkag6suxwtwrx7m9nj96bwi4ge; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT fkkag6suxwtwrx7m9nj96bwi4ge FOREIGN KEY (primary_contact_id) REFERENCES public.contact(id);


--
-- Name: client_order_items fkkb92mprp4l6amsg7tkgqhgkl; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_items
    ADD CONSTRAINT fkkb92mprp4l6amsg7tkgqhgkl FOREIGN KEY (items_id) REFERENCES public.order_item(id);


--
-- Name: favorite_recipe fkkc0xeltectgqgjnuemidtyi4i; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_recipe
    ADD CONSTRAINT fkkc0xeltectgqgjnuemidtyi4i FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: client_order fkkromx4nuvvb15g3q08o79guh0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order
    ADD CONSTRAINT fkkromx4nuvvb15g3q08o79guh0 FOREIGN KEY (clerk_id) REFERENCES public.person(id);


--
-- Name: delivery_events fkl8mtffuoimymikn0dx9ptwj5w; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_events
    ADD CONSTRAINT fkl8mtffuoimymikn0dx9ptwj5w FOREIGN KEY (events_id) REFERENCES public.delivery_event(id);


--
-- Name: contact fklft4029s6ytpm7wl0av3c736p; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT fklft4029s6ytpm7wl0av3c736p FOREIGN KEY (channel_id) REFERENCES public.contact_channel(id);


--
-- Name: product_recipe fklh6iyqa5lauoxlli6yo68no57; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_recipe
    ADD CONSTRAINT fklh6iyqa5lauoxlli6yo68no57 FOREIGN KEY (output_id) REFERENCES public.input(id);


--
-- Name: functionary_payment fklpumd5crxleroeemgoxck36lw; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_payment
    ADD CONSTRAINT fklpumd5crxleroeemgoxck36lw FOREIGN KEY (transaction_id) REFERENCES public.generic_transaction(id);


--
-- Name: recipe_outputs fklw97ehfi9g6luu0ibtttrmwcv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_outputs
    ADD CONSTRAINT fklw97ehfi9g6luu0ibtttrmwcv FOREIGN KEY (recipe_id) REFERENCES public.recipe(id);


--
-- Name: delivery fkmhnmmq1d58ri0rfa7fbhag2ou; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT fkmhnmmq1d58ri0rfa7fbhag2ou FOREIGN KEY (deliveryman_id) REFERENCES public.deliveryman(id);


--
-- Name: sales_prospect_prospected fkmk178prh9vg9dv1io05xqj1xj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_prospect_prospected
    ADD CONSTRAINT fkmk178prh9vg9dv1io05xqj1xj FOREIGN KEY (prospected_id) REFERENCES public.order_item(id);


--
-- Name: order_item_events fkmpurrbac36mbts6t85hfns370; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_events
    ADD CONSTRAINT fkmpurrbac36mbts6t85hfns370 FOREIGN KEY (order_item_id) REFERENCES public.order_item(id);


--
-- Name: deliveryman_payment_work_days fkn0e6pv0gvkik7srguvk2uorhm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payment_work_days
    ADD CONSTRAINT fkn0e6pv0gvkik7srguvk2uorhm FOREIGN KEY (work_days_id) REFERENCES public.deliveryman_work_day(id);


--
-- Name: input_converters fkn2nywhyetldhimfcd2dbhx47x; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_converters
    ADD CONSTRAINT fkn2nywhyetldhimfcd2dbhx47x FOREIGN KEY (input_id) REFERENCES public.input(id);


--
-- Name: transaction_modality fkn5idsgbywtqdf7ce2bsa29iwb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_modality
    ADD CONSTRAINT fkn5idsgbywtqdf7ce2bsa29iwb FOREIGN KEY (favorite_id) REFERENCES public.account(id);


--
-- Name: functionary_work_day fknb81ckdyreyh3eglypcmv41op; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_work_day
    ADD CONSTRAINT fknb81ckdyreyh3eglypcmv41op FOREIGN KEY (functionary_id) REFERENCES public.person(id);


--
-- Name: purchase_product fknjbml0hkqp384epjqrakukme9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_product
    ADD CONSTRAINT fknjbml0hkqp384epjqrakukme9 FOREIGN KEY (input_id) REFERENCES public.input(id);


--
-- Name: functionary_payment fknvjxtvmwm9e4jqjbm6v315d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_payment
    ADD CONSTRAINT fknvjxtvmwm9e4jqjbm6v315d FOREIGN KEY (functionary_id) REFERENCES public.person(id);


--
-- Name: input_prices fknwfnf9x1m47ols0xyiyub9fb2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_prices
    ADD CONSTRAINT fknwfnf9x1m47ols0xyiyub9fb2 FOREIGN KEY (input_id) REFERENCES public.input(id);


--
-- Name: product_items fko1h6bi5dlx7wwdk3icn3fvahj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT fko1h6bi5dlx7wwdk3icn3fvahj FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: functionary_contract_functions fko3b3ky67c2l0fmgqac6um4jlt; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_contract_functions
    ADD CONSTRAINT fko3b3ky67c2l0fmgqac6um4jlt FOREIGN KEY (functions_id) REFERENCES public.functionary_function(id);


--
-- Name: recipe_outputs fkojhjsfds63s38wqul2rppnfm5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_outputs
    ADD CONSTRAINT fkojhjsfds63s38wqul2rppnfm5 FOREIGN KEY (outputs_id) REFERENCES public.item(id);


--
-- Name: deliveryman_work_days fkon330ii2etyycgjt3410am2fx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_days
    ADD CONSTRAINT fkon330ii2etyycgjt3410am2fx FOREIGN KEY (work_days_id) REFERENCES public.deliveryman_work_day(id);


--
-- Name: client_order_events fkoq65x2xjd0p8w67vvi69fk8hs; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_events
    ADD CONSTRAINT fkoq65x2xjd0p8w67vvi69fk8hs FOREIGN KEY (client_order_id) REFERENCES public.client_order(id);


--
-- Name: product_categories fkppc5s0f38pgb35a32dlgyhorc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT fkppc5s0f38pgb35a32dlgyhorc FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: functionary_payment_days fkq4irwsf7mb0uh3bdy5femkxct; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionary_payment_days
    ADD CONSTRAINT fkq4irwsf7mb0uh3bdy5femkxct FOREIGN KEY (days_id) REFERENCES public.functionary_work_day(id);


--
-- Name: delivery_order_items fkqq4o8hxf9r8s51b1kukk0x89t; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_order_items
    ADD CONSTRAINT fkqq4o8hxf9r8s51b1kukk0x89t FOREIGN KEY (delivery_order_id) REFERENCES public.delivery_order(id);


--
-- Name: ingredient_replacement fkqvkiqgwccq9bv0i9o0aj4re2r; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredient_replacement
    ADD CONSTRAINT fkqvkiqgwccq9bv0i9o0aj4re2r FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: client_order fkr5jcbq1jm2ths980n42s4clsy; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order
    ADD CONSTRAINT fkr5jcbq1jm2ths980n42s4clsy FOREIGN KEY (client_id) REFERENCES public.person(id);


--
-- Name: deliveryman_payment_work_days fkr7aft3fl2jp36mmuhn0m8x99p; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_payment_work_days
    ADD CONSTRAINT fkr7aft3fl2jp36mmuhn0m8x99p FOREIGN KEY (deliveryman_payment_id) REFERENCES public.deliveryman_payment(id);


--
-- Name: person fkr9h5y8iyoaqmt8369yoqsqvtj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT fkr9h5y8iyoaqmt8369yoqsqvtj FOREIGN KEY (primary_address_id) REFERENCES public.address(id);


--
-- Name: item_replacements fkrela0qvvp7ghct2dlhbd3oqpe; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_replacements
    ADD CONSTRAINT fkrela0qvvp7ghct2dlhbd3oqpe FOREIGN KEY (ingredient_id) REFERENCES public.item(id);


--
-- Name: deliveryman_work_days fkrgc7qsumcl6uy0t5rb72ls0pd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman_work_days
    ADD CONSTRAINT fkrgc7qsumcl6uy0t5rb72ls0pd FOREIGN KEY (deliveryman_id) REFERENCES public.deliveryman(id);


--
-- Name: input_unit_converter fkrkuurq5ylqfq0v940ww51xqoo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.input_unit_converter
    ADD CONSTRAINT fkrkuurq5ylqfq0v940ww51xqoo FOREIGN KEY (unitb_id) REFERENCES public.unit(id);


--
-- Name: purchase_product fkrn3ky1rhx8qhf6xlstgw6euav; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_product
    ADD CONSTRAINT fkrn3ky1rhx8qhf6xlstgw6euav FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: person_contacts fkryf85wpcvfgxhc9hlc5ucppi2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_contacts
    ADD CONSTRAINT fkryf85wpcvfgxhc9hlc5ucppi2 FOREIGN KEY (contacts_id) REFERENCES public.contact(id);


--
-- Name: deliveryman fkshuopjw1d9ot3geymj5pva5ld; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveryman
    ADD CONSTRAINT fkshuopjw1d9ot3geymj5pva5ld FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: generic_transaction fksm5vuy84utk3pydsq5srd87a1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generic_transaction
    ADD CONSTRAINT fksm5vuy84utk3pydsq5srd87a1 FOREIGN KEY (voucher_id) REFERENCES public.transaction_voucher(id);


--
-- Name: order_item_sub_items fksvshbl5acphcqjoolihvq4mm3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item_sub_items
    ADD CONSTRAINT fksvshbl5acphcqjoolihvq4mm3 FOREIGN KEY (order_item_id) REFERENCES public.order_item(id);


--
-- Name: sales_prospect_prospected fktfp54xoc49mulh3kxrr8ryevg; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_prospect_prospected
    ADD CONSTRAINT fktfp54xoc49mulh3kxrr8ryevg FOREIGN KEY (sales_prospect_id) REFERENCES public.sales_prospect(id);


--
-- Name: favorite_recipe fktl8k645u71wlkca86rpdbaqof; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_recipe
    ADD CONSTRAINT fktl8k645u71wlkca86rpdbaqof FOREIGN KEY (output_id) REFERENCES public.input(id);


--
-- Name: client_order_deliveries fktm5344hhaqldv60nb7jujc5n5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_order_deliveries
    ADD CONSTRAINT fktm5344hhaqldv60nb7jujc5n5 FOREIGN KEY (deliveries_id) REFERENCES public.delivery_order(id);


--
-- PostgreSQL database dump complete
--


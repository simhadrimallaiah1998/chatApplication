/* Replace with your SQL commands */

-- Table: public.chatting

-- DROP TABLE IF EXISTS public.chatting;

CREATE TABLE IF NOT EXISTS public.chatting
(
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    chat text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chatting
    OWNER to postgres;
-- Table: public.chats

-- DROP TABLE IF EXISTS public.chats;

CREATE TABLE IF NOT EXISTS public.chats
(
    chat_id integer NOT NULL,
    chat text COLLATE pg_catalog."default",
    created_at date,
    CONSTRAINT chat_id FOREIGN KEY (chat_id)
        REFERENCES public.signin (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chats
    OWNER to postgres;
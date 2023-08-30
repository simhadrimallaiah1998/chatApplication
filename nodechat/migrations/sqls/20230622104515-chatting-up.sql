/* Replace with your SQL commands */

-- Table: public.chatting

-- DROP TABLE IF EXISTS public.chatting;

CREATE TABLE IF NOT EXISTS public.chatting
(
    chat_id text,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    chat text COLLATE pg_catalog."default",
    created_at timestamp not null default now()
)


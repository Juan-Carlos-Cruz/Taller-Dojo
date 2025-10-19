-- Schema base
CREATE TABLE IF NOT EXISTS actors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  last_update TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para actualizar last_update en UPDATE
CREATE OR REPLACE FUNCTION trg_set_last_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_update := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_last_update ON actors;
CREATE TRIGGER set_last_update
BEFORE UPDATE ON actors
FOR EACH ROW
EXECUTE FUNCTION trg_set_last_update();

-- Índice para búsquedas por apellido
CREATE INDEX IF NOT EXISTS idx_actors_last_name ON actors(last_name);

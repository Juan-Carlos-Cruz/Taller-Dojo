import { http } from './http';

export function listActors({ page = 1, limit = 10, search = '' }) {
  const q = new URLSearchParams({ page, limit, search }).toString();
  return http(`/actors?${q}`);
}

export function getActor(id) {
  return http(`/actors/${id}`);
}

export function createActor(payload) {
  return http(`/actors`, { method: 'POST', body: JSON.stringify(payload) });
}

export function updateActor(id, payload) {
  return http(`/actors/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export function deleteActorById(id) {
  return http(`/actors/${id}`, { method: 'DELETE' });
}

export const FILTERABLE_FIELDS = [
  { value: 'id', label: 'N de dossier' },
  { value: 'category', label: 'Catégorie' },
  { value: 'name', label: 'Nom et Prénom' },
  { value: 'status', label: 'Etat' },
  { value: 'phone', label: 'Téléphone / fixe' },
  { value: 'email', label: 'Email' },
] as const

export type FilterField = (typeof FILTERABLE_FIELDS)[number]['value']

export interface Criterion {
  id: string
  field?: FilterField
  value: string
}

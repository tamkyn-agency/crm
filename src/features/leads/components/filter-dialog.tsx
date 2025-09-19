import * as React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FILTERABLE_FIELDS, type Criterion, type FilterField } from './filter-dialog-core'

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  criteria: Criterion[]
  setCriteria: React.Dispatch<React.SetStateAction<Criterion[]>>
  onApply: () => void
  onClearAll: () => void
}

export function FilterDialog({
  open,
  onOpenChange,
  criteria,
  setCriteria,
  onApply,
  onClearAll,
}: FilterDialogProps) {
  function updateCriterion(id: string, patch: Partial<Criterion>) {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }
  function removeCriterion(id: string) {
    setCriteria((prev) => prev.filter((c) => c.id !== id))
  }
  function addCriterion() {
    setCriteria((prev) => [...prev, { id: crypto.randomUUID(), value: '' }])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader className='mb-2'>
          <div className='flex items-center justify-between'>
            <DialogTitle>Filtre</DialogTitle>
            {criteria.length > 0 && (
              <Button variant='link' className='px-0 text-red-600' onClick={onClearAll}>
                Supprimer tous les critères
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className='space-y-4'>
          <ScrollArea className='max-h-[320px] pr-2'>
            <div className='space-y-3'>
              {criteria.length === 0 && (
                <p className='text-sm text-muted-foreground italic'>Aucun critère – ajoutez-en un pour commencer.</p>
              )}
              {criteria.map((c) => {
                const fieldMeta = FILTERABLE_FIELDS.find((f) => f.value === c.field)
                return (
                  <div key={c.id} className='group grid grid-cols-[170px_1fr_auto] items-center gap-2 rounded-md border p-2'>
                    <Select value={c.field} onValueChange={(v: FilterField) => updateCriterion(c.id, { field: v })}>
                      <SelectTrigger className='h-8'>
                        <SelectValue placeholder='Sélectionnez' />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTERABLE_FIELDS.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder={fieldMeta ? `Valeur pour ${fieldMeta.label}` : 'Valeur'}
                      value={c.value}
                      onChange={(e) => updateCriterion(c.id, { value: e.target.value })}
                      className='h-8'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 opacity-60 hover:opacity-100'
                      onClick={() => removeCriterion(c.id)}
                    >
                      <IconTrash size={16} />
                    </Button>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
          <div className='flex flex-wrap items-center gap-4'>
            <Button variant='outline' size='sm' onClick={addCriterion}>
              <IconPlus size={16} className='mr-1' /> Ajouter un critères
            </Button>
            <Button variant='outline' size='sm' disabled>
              + Ajouter un groupe de critères
            </Button>
          </div>
        </div>
        <DialogFooter className='mt-6'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onApply}>Appliquer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

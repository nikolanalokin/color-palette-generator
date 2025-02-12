import { getGeneratorInstance } from '../core/astral'
import { $palettes, addPalette, updatePalette } from '../stores'
import { updateTemplate } from '../stores/template'
import { PaletteVO, TemplateVO } from '../types'
import { getNextId } from '../utils/getNextId'

export const createPalettes = (palettes: Partial<PaletteVO>[]) => {
    const ids = []
    for (let palette of palettes) {
        const dbPalettes = $palettes.getState()
        const newPalette = { ...palette, id: getNextId(dbPalettes) } as PaletteVO
        ids.push(newPalette.id)
        addPalette(newPalette)
    }
    const dbPalettes = $palettes.getState()
    return dbPalettes.filter(p => ids.includes(p.id))
}

export const saveTemplate = (template: Partial<TemplateVO>) => {
    const dbPalettes = $palettes.getState()
    const instance = getGeneratorInstance(template)
    for (let palette of dbPalettes) {
        if (palette.templateId !== template.id) continue
        const result = instance?.generate(palette.inputColor)
        updatePalette({ ...palette, ...result })
    }
    updateTemplate(template as TemplateVO)
    return template
}

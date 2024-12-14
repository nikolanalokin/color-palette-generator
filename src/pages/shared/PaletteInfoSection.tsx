import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { BetweenHorizontalStartIcon, InfoIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { PaletteInfo, ShadeInfo } from '../../core'
import { formatHsl, formatOkhsl } from './format-utils'
import { IconButton, Tooltip, TooltipContent, TooltipTrigger } from '../../components'
import { BLACK_HEX, WHITE_HEX } from '../../core/utils'
import { PaletteGradient } from './PaletteGradient'
import { PaletteOptions, setThemeTone } from '../../stores/app'

export type PaletteInfoSectionProps = {
    palette?: PaletteInfo
    options?: PaletteOptions
    onOptionsChange?(value: PaletteOptions): void
}

function scaleToMap (scale: number[]) {
    return scale.reduce((acc, tone) => (acc.set(tone, String(tone)), acc), new Map<number, string>())
}

function mapToScale (map: Map<number, string>) {
    const scale = [...map.values()].map(parseFloat)
    scale.sort((a, b) => a - b)
    return scale
}

export const PaletteInfoSection = (props: PaletteInfoSectionProps) => {
    const { palette, options, onOptionsChange } = props
    const [tonesMap, setTonesMap] = useState(scaleToMap(options.scale))
    useEffect(() => {
        setTonesMap(scaleToMap(options.scale))
    }, [options.scale])
    const paletteShadesMap = useMemo(() => {
        return palette.shades.reduce((acc, shade) => acc.set(shade.number, shade), new Map<number, ShadeInfo>())
    }, [palette])
    const updateOptions = (map: Map<number, string>) => {
        onOptionsChange?.({ ...options, scale: mapToScale(map) })
    }
    const handleToneChange = (tone: number, value: string) => {
        if (!/\d*/.test(value)) {
            return
        }
        tonesMap.set(tone, value)
        setTonesMap(new Map(tonesMap))
    }
    const handleToneRemove = (tone: number) => {
        tonesMap.delete(tone)
        const tonesMapCopy = new Map(tonesMap)
        setTonesMap(tonesMapCopy)
        updateOptions(tonesMapCopy)
    }
    const handleToneAddAfter = (tone: number) => {
        const newTone = Math.round(tone + options.scale[options.scale.findIndex(t => t === tone) + 1]) / 2
        tonesMap.set(newTone, String(newTone))
        const tonesMapCopy = new Map(tonesMap)
        setTonesMap(tonesMapCopy)
        updateOptions(tonesMapCopy)
    }
    const handleSubmit = () => {
        updateOptions(tonesMap)
    }
    const tip = (
        <Tooltip>
            <TooltipTrigger asChild>
                <InfoIcon size="1em" />
            </TooltipTrigger>
            <TooltipContent>
                <span>Контрастность:</span>
                <ol>
                    <li>чёрного на цвете</li>
                    <li>белого на цвете</li>
                    <li>цвета на черном</li>
                    <li>цвета на белом</li>
                </ol>
            </TooltipContent>
        </Tooltip>
    )
    return (
        <form
            css={{ display: 'contents' }}
            onSubmit={evt => {
                evt.preventDefault()
                handleSubmit()
            }}
        >
            <PaletteInfoSectionRoot>
                <PaletteGradientContainer>
                    <PaletteGradient palette={palette} />
                </PaletteGradientContainer>
                    <TableContainer>
                        <Table>
                            <thead>
                                <TableHeadRow>
                                    <TextCell></TextCell>

                                    <ShadeColorCell></ShadeColorCell>

                                    <ContrastCell>
                                        <Heading>
                                            <span>WCAG</span>
                                            { tip }
                                        </Heading>
                                    </ContrastCell>

                                    <ContrastCell>
                                        <Heading>
                                            <span>APCA</span>
                                            { tip }
                                        </Heading>
                                    </ContrastCell>

                                    <TextCell>
                                        <Heading>ΔE</Heading>
                                    </TextCell>
                                </TableHeadRow>
                            </thead>
                            <tbody>
                                { options.scale.map((tone, index) => {
                                    const shade = paletteShadesMap.get(tone)
                                    const color = Math.abs(shade.apca.blackOn) >= 45 ? 'black' :'white'
                                    const row = createRow(shade)
                                    const highlight = palette.nearestShade.number === shade.number
                                    return (
                                        <TableRow key={shade.id} data-highlight={highlight}>
                                            <ToneCell>
                                                <ToneInput
                                                    type="text"
                                                    value={tonesMap.get(shade.number)}
                                                    onChange={evt => handleToneChange(shade.number, evt.target.value)}
                                                />
                                            </ToneCell>

                                            <ShadeColorCell>
                                                <ShadeColorDisplay css={getColorStyles(color, row.hex)} onClick={() => setThemeTone(shade.number)}>
                                                    <Text>{ row.hex }</Text>
                                                </ShadeColorDisplay>
                                            </ShadeColorCell>

                                            <ContrastCell>
                                                <ContrastDisplayGrid>
                                                    <ContrastDisplay css={getColorStyles(BLACK_HEX, row.hex)}>
                                                        <Text>{ row.wcag.blackOn.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                    <ContrastDisplay css={getColorStyles(row.hex, BLACK_HEX)}>
                                                        <Text>{ row.wcag.onBlack.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                    <ContrastDisplay css={getColorStyles(WHITE_HEX, row.hex)}>
                                                        <Text>{ row.wcag.whiteOn.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                    <ContrastDisplay css={getColorStyles(row.hex, WHITE_HEX)}>
                                                        <Text>{ row.wcag.onWhite.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                </ContrastDisplayGrid>
                                            </ContrastCell>

                                            <ContrastCell>
                                                <ContrastDisplayGrid>
                                                    <ContrastDisplay css={getColorStyles(BLACK_HEX, row.hex)}>
                                                        <Text>{ row.apca.blackOn.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                    <ContrastDisplay css={getColorStyles(row.hex, BLACK_HEX)}>
                                                        <Text>{ row.apca.onBlack.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                    <ContrastDisplay css={getColorStyles(WHITE_HEX, row.hex)}>
                                                        <Text>{ row.apca.whiteOn.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                    <ContrastDisplay css={getColorStyles(row.hex, WHITE_HEX)}>
                                                        <Text>{ row.apca.onWhite.toFixed(2) }</Text>
                                                    </ContrastDisplay>
                                                </ContrastDisplayGrid>
                                            </ContrastCell>

                                            <TextCell>
                                                <Text>{ row.deltaE }</Text>
                                            </TextCell>

                                            <ActionsCell>
                                                <Actions>
                                                    <IconButton
                                                        type="button"
                                                        onClick={() => handleToneRemove(shade.number)}
                                                    >
                                                        <Trash2Icon />
                                                    </IconButton>
                                                </Actions>
                                            </ActionsCell>
                                        </TableRow>
                                    )
                                }) }
                            </tbody>
                        </Table>

                        <AddToneActionsContainer>
                            { options.scale.slice(0, -1).map((tone, index) => {
                                const shade = paletteShadesMap.get(tone)
                                return (
                                    <AddToneActionsItem key={shade.id}>
                                        <AddToneButtonContainer>
                                            <AddToneButton
                                                type="button"
                                                variant="blur"
                                                onClick={() => handleToneAddAfter(shade.number)}
                                            >
                                                <BetweenHorizontalStartIcon />
                                            </AddToneButton>
                                        </AddToneButtonContainer>
                                    </AddToneActionsItem>
                                )
                            }) }
                        </AddToneActionsContainer>
                    </TableContainer>
            </PaletteInfoSectionRoot>

            <input type="submit" hidden />
        </form>
    )
}

const createRow = (shade: ShadeInfo) => {
    return {
        hex: shade.hex,
        wcag: shade.wcag,
        apca: shade.apca,
        hsl: formatHsl(shade.hsl),
        okhsl: formatOkhsl(shade.okhsl),
        deltaE: shade.delta.toPrecision(4),
    }
}

const getColorStyles = (fgColor: string, bgColor: string) => {
    return {
        color: fgColor,
        backgroundColor: bgColor,
    }
}

const PaletteInfoSectionRoot = styled.div(
    ({}) => ({
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '24px',
    })
)

const PaletteGradientContainer = styled.div({
    paddingBlockStart: '64px',
})

const TableContainer = styled.div({
    position: 'relative',
})

const Table = styled.table({
    position: 'relative',
    borderCollapse: 'collapse',
    borderSpacing: '24px 0',
})

const TableHeadRow = styled.tr({
    height: '64px',
})

const TableRow = styled.tr(
    ({}) => ({
        '&[data-highlight="true"]': {
            position: 'relative',
            boxShadow: '0 0 0 1px white, 0 0 0 3px black',
        },

        [`&:hover ${Actions}`]: {
            opacity: 1,
            visibility: 'visible',
        },

        [`&:hover ${AddToneButtonContainer}`]: {
            opacity: 1,
            visibility: 'visible',
        },
    })
)

const Cell = styled.td({
    padding: 0,
    paddingInline: '8px',

    '&:first-of-type': {
        paddingInlineStart: '16px',
    },
    '&:last-of-type': {
        paddingInlineEnd: '16px',
    },
})

const ToneCell = styled(Cell)()
const TextCell = styled(Cell)()
const ShadeColorCell = styled(Cell)()
const ContrastCell = styled(Cell)()
const ActionsCell = styled(Cell)()

const Heading = styled.div({
    fontSize: '1rem',
    fontWeight: 600,
    display: 'flex',
    columnGap: '8px',
    alignItems: 'center',
})

const Text = styled.div({
    fontSize: '0.875rem',
    fontWeight: 500,
})

const Actions = styled.div({
    opacity: 0,
    visibility: 'hidden',
    display: 'flex',
})

const ToneInput = styled.input({
    margin: 0,
    border: 0,
    padding: 0,
    fontSize: '0.875rem',
    fontWeight: 500,
    width: '56px',
})

const ShadeColorDisplay = styled.div({
    height: '64px',
    width: '256px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    paddingInlineStart: '12px',
    cursor: 'pointer',

    [`& > ${Text}`]: {
        opacity: 0,
    },

    [`&:hover > ${Text}`]: {
        opacity: 1,
    },
})

const ContrastDisplayGrid = styled.div({
    width: '160px',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    borderRadius: '8px',
    overflow: 'hidden',
})

const ContrastDisplay = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
})

const AddToneActionsContainer = styled.div({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: '96px 32px',
    pointerEvents: 'none',
})

const AddToneActionsItem = styled.div(
    ({}) => ({
        flexGrow: 1,
        flexShrink: 0,
        height: 0,
        display: 'flex',
        alignItems: 'center',
        paddingInlineStart: '216px',
    })
)

const AddToneButtonContainer = styled.div(
    ({}) => ({
        translate: '-50%',
        padding: '13px',
        pointerEvents: 'all',

        [`&:hover ${AddToneButton}`]: {
            opacity: 1,
            visibility: 'visible',
        },
    })
)

const AddToneButton = styled(IconButton)({
    opacity: 0,
    visibility: 'hidden',
})

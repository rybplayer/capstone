import { useState, useEffect } from 'react'

type CellState = '' | '✗' | '✓'
type Categories = [string, string[]][]

function nextState(s: CellState): CellState {
  return s === '' ? '✗' : s === '✗' ? '✓' : ''
}

function LogicPuzzle({
  categories,
  id,
  cellSize = 25,
  values,
}: {
  categories: Categories
  id?: string
  cellSize?: number
  values?: string[]
}) {
  const keys = categories.map(([k]) => k)
  const cats = Object.fromEntries(categories)
  const colCats = keys.slice(0, -1)
  const rowCats = keys.slice(1).reverse()

  const colItems = colCats.flatMap((cat) =>
    cats[cat]!.map((item: string, i: number) => ({
      cat,
      item,
      idx: keys.indexOf(cat),
      isFirst: i === 0,
      catLen: cats[cat]!.length,
    })),
  )

  const rowItems = rowCats.flatMap((cat) =>
    cats[cat]!.map((item: string, i: number) => ({
      cat,
      item,
      idx: keys.indexOf(cat),
      isFirst: i === 0,
      catLen: cats[cat]!.length,
    })),
  )

  const storageKey = `logic-puzzle-${id ?? keys.join('-')}`
  const [state, setState] = useState<Record<string, CellState>>({})
  const [loaded, setLoaded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragState, setDragState] = useState<CellState>('')

  const isReadOnly = values !== undefined && values.length > 0

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) setState(JSON.parse(saved))
    setLoaded(true)
  }, [storageKey])

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state, loaded, storageKey])

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const handleMouseDown = (r: number, c: number) => {
    if (isReadOnly) return
    const key = `${r}:${c}`
    const newState = nextState(state[key] || '')
    setIsDragging(true)
    setDragState(newState)
    setState((s) => ({ ...s, [key]: newState }))
  }

  const handleMouseEnter = (r: number, c: number) => {
    if (!isDragging || isReadOnly) return
    const key = `${r}:${c}`
    setState((s) => ({ ...s, [key]: dragState }))
  }

  if (!loaded) return null

  const cellsBeforeRow = rowItems.map((_, ri) =>
    rowItems.slice(0, ri).reduce((sum, row) => {
      const count = colCats
        .slice(0, row.idx)
        .reduce((s, cat) => s + cats[cat]!.length, 0)
      return sum + count
    }, 0),
  )

  const s = cellSize
  const w = { width: s, minWidth: s, maxWidth: s }
  const h = { height: s, minHeight: s, maxHeight: s }
  const b = 'border border-foreground/30'
  const txt = 'text-xs leading-none p-1'
  const empty = {
    ...w,
    ...h,
    borderTop: '1px solid var(--background)',
    padding: 0,
  }

  return (
    <div className="my-6 overflow-x-auto">
      <table>
        <thead>
          <tr>
            <td style={empty} />
            <td style={empty} />
            {colCats.map((cat) => (
              <th
                key={cat}
                colSpan={cats[cat]!.length}
                className={`${b} ${txt} text-center font-bold`}
                style={h}
              >
                {cat}
              </th>
            ))}
          </tr>
          <tr>
            <td style={empty} />
            <td style={empty} />
            {colItems.map((col, i) => (
              <th
                key={i}
                className={`${b} ${txt} rotate-180 font-normal [writing-mode:vertical-rl]`}
                style={w}
              >
                {col.item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowItems.map((r, ri) => {
            const validColCount = colCats
              .slice(0, r.idx)
              .reduce((sum, cat) => sum + cats[cat]!.length, 0)
            return (
              <tr key={ri}>
                {r.isFirst && (
                  <th
                    rowSpan={r.catLen}
                    className={`${b} ${txt} rotate-180 text-center font-bold [writing-mode:vertical-rl]`}
                    style={w}
                  >
                    {r.cat}
                  </th>
                )}
                <th
                  className={`${b} ${txt} width-dynamic text-right font-normal whitespace-nowrap`}
                  style={{ height: s }}
                >
                  {r.item}
                </th>
                {colItems.slice(0, validColCount).map((_, ci) => {
                  const linearIndex = (cellsBeforeRow[ri] ?? 0) + ci
                  const providedValue = values?.[linearIndex]
                  const val =
                    providedValue !== undefined && providedValue !== ''
                      ? providedValue
                      : state[`${ri}:${ci}`] || ''
                  return (
                    <td
                      key={ci}
                      onMouseDown={() => handleMouseDown(ri, ci)}
                      onMouseEnter={() => handleMouseEnter(ri, ci)}
                      className={`${b} ${txt} text-center align-middle whitespace-pre-line select-none ${isReadOnly ? '' : 'hover:bg-muted cursor-pointer'}`}
                      style={{ ...w, ...h }}
                    >
                      {val === '✓' ? (
                        <span className="text-primary">{val}</span>
                      ) : (
                        val
                      )}
                    </td>
                  )
                })}
                {colItems.slice(validColCount).map((_, ci) => (
                  <td key={ci} style={empty} />
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LogicPuzzle

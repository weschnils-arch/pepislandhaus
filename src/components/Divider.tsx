interface DividerProps {
  linesHidden?: boolean
}

export default function Divider({ linesHidden = false }: DividerProps) {
  return (
    <div className="flex items-center justify-center py-16 md:py-24">
      {!linesHidden && (
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent via-sage/30 dark:via-accent/20 to-transparent" />
      )}
      <div className={`w-[10px] h-[10px] border border-sage/50 dark:border-accent/50 rotate-45 ${linesHidden ? '' : 'mx-6'}`} />
      {!linesHidden && (
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent via-sage/30 dark:via-accent/20 to-transparent" />
      )}
    </div>
  )
}

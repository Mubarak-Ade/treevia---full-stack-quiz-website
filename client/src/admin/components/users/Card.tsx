import { getColorFromString } from "@/utils/colorFormat"

interface CardProps {
    title: string,
    value: number,
    icon: React.ReactNode
}
export const Card = ({title, value, icon} : CardProps) => {
    const color = getColorFromString(title)
  return (
    <div className="bg-muted rounded-full flex gap-4 max-w-3xs w-full items-center py-6 justify-center">
        <div className={`${color.gradient} rounded-full ${color.border} border ${color.text} p-4`}>
            {icon}
        </div>
        <div className="">
            <h6 className="text-sm text-secondary font-semibold">{title}</h6>
            <h2 className="text-2xl font-bold text-white">{value}</h2>
        </div>
    </div>
  )
}

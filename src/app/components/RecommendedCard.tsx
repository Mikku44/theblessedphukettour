export default function RecommendedCard({className,img,text,description}:any){
    return <div className={`w-52 h-52 rounded-xl p-2 flex items-end  ${className}`}>
        <div className="grid gap-1 text-white w-full px-2">
            <div className="text-xl font-bold">{text}</div>
            <div className="text-sm">{description}</div>
            </div>
    </div>
}
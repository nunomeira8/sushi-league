type Props = {
  title: string
}

export function WelcomeSection({
  title,
}: Props) {
  return (
    <div className="mt-14 text-center">
      <h3 className="text-4xl font-bold text-[#222222]">
        {title}
      </h3>
    </div>
  )
}
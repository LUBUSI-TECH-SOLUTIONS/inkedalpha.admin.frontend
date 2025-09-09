import { FormColor } from "./formColor"

export const NewColor = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <FormColor />
      </div>
    </div>
  )
}
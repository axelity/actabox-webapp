type ButtonProps = {
  label: string
  onClick: () => void
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
        type="button"
        className="inline-flex items-center px-4 py-2 mr-2 my-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onClick}
      >
        {label}
        </button>
  )
}

export default Button

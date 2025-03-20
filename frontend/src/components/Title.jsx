const Title = ({title1, title2}) => {

  return (
    <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-md sm:text-2xl text-gray-500 text-center">{title1}</p>
        <span className="text-md sm:text-2xl text-red-400 text-center">{title2}</span>
    </div>
  )
}

export default Title
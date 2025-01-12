const Button = ({ onClick, className = "", full, type = "button", bgColor = "primary", children , ...props}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;

        default:
            break;
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-3 px-6 rounded-lg capitalize ${bgClassName} font-medium ${full ? "w-full" : ""} mt-auto ${className}`}
        {...props}
        >
            {children}
        </button>
    )
}

export default Button

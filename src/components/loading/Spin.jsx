import PropTypes from "prop-types";

const Spin = ({
    size = "h-5 w-5",
    color = "text-white",
    className = "",
}) => {
    return (
        <div className={className}>
            <svg
                className={`animate-spin ${size} ${color}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <circle
                    className="opacity-75"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="60"
                    strokeDashoffset="20"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

Spin.propTypes = {
    /** Tailwind size class, ví dụ: "h-5 w-5", "h-8 w-8" */
    size: PropTypes.string,
    /** Tailwind text color class, ví dụ: "text-white", "text-indigo-500" */
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Spin;

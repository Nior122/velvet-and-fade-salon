import { Link } from "react-router-dom";
import { salon } from "../data/salonConfig";

/**
 * Booking CTA that respects the owner-editable `salon.bookingUrl`.
 * If an external booking URL is set, it renders an anchor; otherwise it
 * routes to the built-in booking flow at /booking.
 */
export default function BookButton({ children, className = "", onClick, ...rest }) {
  const label = children || "Book Now";
  if (salon.bookingUrl) {
    return (
      <a
        href={salon.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        {...rest}
      >
        {label}
      </a>
    );
  }
  return (
    <Link to="/booking" className={className} onClick={onClick} {...rest}>
      {label}
    </Link>
  );
}

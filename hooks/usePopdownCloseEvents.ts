import { useEffect, useRef } from "react";

export default function usePopdownCloseEvents(closeFunction: Function) {
    const ref = useRef<HTMLDivElement>(null)

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeFunction();
        }
    };

    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            closeFunction();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return ref;
}
interface HoverButtonProps {
  /**
   * The text content to display inside the button
   */
  children?: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * A button component with a hover effect that shifts position and adds layered shadows
 * 
 * @component
 * @example
 * return (
 *   <HoverButton onClick={() => console.log('clicked')}>
 *     Contact me
 *   </HoverButton>
 * )
 */
const HoverButton = ({ children = 'Contact me', onClick }: HoverButtonProps) => {
    return (
        <>
            <button className="group relative" onClick={onClick}>
                <div
                    className="relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-full
        bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(76_100_255)] border-2 border-[#263381] 
         bg-transparent px-6 font-medium dark:text-white text-black  transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3"
                >
                    {children}
                </div>
                <div className="absolute inset-0 z-0 h-full w-full rounded-full transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3  group-hover:[box-shadow:5px_5px_#394481,10px_10px_#5766be,15px_15px_#8898f3]"></div>
            </button>
        </>
    )
}

export default HoverButton
